"""Validate the public HTML contracts crawlers and app visitors consume."""
import json
import subprocess
import unittest
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote, parse_qs

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = 'https://studio-hevv.com'
HOME = {'ko': '/', 'en': '/en/', 'es': '/es/', 'pt-BR': '/pt-br/'}
SELAH = {'ko': '/selah/', 'en': '/selah/en/', 'es': '/selah/es/', 'pt-BR': '/selah/pt-br/'}
CAMERA = {'en': '/receipt-cam/', 'ko': '/receipt-cam/ko/', 'ja': '/receipt-cam/ja/',
          'zh-Hans': '/receipt-cam/zh-hans/', 'zh-Hant': '/receipt-cam/zh-hant/',
          'pt-PT': '/receipt-cam/pt-pt/', 'es': '/receipt-cam/es/'}


class Document(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.path = path
        self.tags = []
        self.scripts = []
        self._script = None
        file = ROOT / path.lstrip('/') / 'index.html'
        if not file.is_file():
            raise AssertionError(f'Missing public landing URL: {path}')
        self.feed(file.read_text())

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append((tag, attrs))
        if tag == 'script':
            self._script = [attrs, '']

    def handle_data(self, data):
        if self._script is not None:
            self._script[1] += data

    def handle_endtag(self, tag):
        if tag == 'script' and self._script is not None:
            self.scripts.append(self._script)
            self._script = None

    def attrs(self, tag, **where):
        return [a for t, a in self.tags if t == tag and all(a.get(k) == v for k, v in where.items())]

    def apps(self):
        return [json.loads(body) for attrs, body in self.scripts
                if attrs.get('type') == 'application/ld+json'
                and json.loads(body).get('@type') == 'MobileApplication']


class SEOContractTests(unittest.TestCase):
    def check_locales(self, routes, default):
        for lang, path in routes.items():
            with self.subTest(path=path):
                doc = Document(path)
                self.assertEqual(doc.attrs('html')[0]['lang'], lang)
                self.assertEqual(doc.attrs('link', rel='canonical')[0]['href'], ORIGIN + path)
                alternates = {a['hreflang']: a['href'] for a in doc.attrs('link', rel='alternate') if 'hreflang' in a}
                self.assertEqual(alternates, {**{k: ORIGIN + v for k, v in routes.items()}, 'x-default': ORIGIN + default})
                anchors = {a.get('href') for a in doc.attrs('a')}
                for alternate in routes.values():
                    if alternate == path:
                        continue
                    self.assertTrue(alternate in anchors or ORIGIN + alternate in anchors,
                                    f'{path} needs a crawlable language link to {alternate}')
                self.assertTrue(doc.attrs('meta', name='description')[0].get('content'))

    def test_home_language_urls_are_independently_discoverable(self):
        self.check_locales(HOME, '/')

    def test_camera_language_urls_are_independently_discoverable(self):
        self.check_locales(CAMERA, '/receipt-cam/')

    def test_selah_language_urls_remain_reciprocal(self):
        self.check_locales(SELAH, '/selah/')

    def test_selah_english_browser_keeps_requested_korean_url(self):
        scripts = [body for attrs, body in Document('/selah/').scripts if not attrs.get('type') and not attrs.get('src')]
        # Execute the real inline scripts. A language-based redirect is observable,
        # even if its implementation changes from replace() to assign().
        runner = """
const vm = require('node:vm');
const fs = require('node:fs');
let redirects = [];
const location = {search:'', hash:'', replace:u=>redirects.push(u), assign:u=>redirects.push(u)};
const storage = {getItem:()=>null,setItem:()=>{}};
const context = {navigator:{languages:['en-US'],language:'en-US'},location,
  window:{location,localStorage:storage},document:{querySelectorAll:()=>[],getElementById:()=>null,addEventListener:()=>{}}};
for (const script of JSON.parse(fs.readFileSync(0,'utf8'))) vm.runInNewContext(script, context);
process.stdout.write(JSON.stringify(redirects));
"""
        result = subprocess.run(['node', '-e', runner], input=json.dumps(scripts), text=True, capture_output=True, check=True)
        self.assertEqual(json.loads(result.stdout), [], 'Opening Korean Selah must not navigate to English')

    def test_camera_download_buttons_open_the_current_app(self):
        for path in ['/', *CAMERA.values()]:
            with self.subTest(path=path):
                links = [a['href'] for a in Document(path).attrs('a') if 'apps.apple.com' in a.get('href', '')]
                self.assertTrue(any('id6793950109' in u for u in links))
                self.assertFalse(any('id6742352829' in u for u in links))

    def test_app_schema_identifies_both_install_destinations(self):
        for path in [*SELAH.values(), *CAMERA.values(), '/biblical-dict/']:
            with self.subTest(path=path):
                app = Document(path).apps()[0]
                for key in ['installUrl', 'downloadUrl']:
                    self.assertIn(key, app)
                    urls = app[key]
                    if isinstance(urls, str):
                        urls = [urls]
                    self.assertTrue(any('apps.apple.com' in u for u in urls))
                    self.assertTrue(any('play.google.com' in u for u in urls))
                self.assertIn(app['applicationCategory'], ['LifestyleApplication', 'MultimediaApplication', 'ReferenceApplication'])
                if path.startswith('/receipt-cam/'):
                    self.assertEqual(app['name'], 'Receipt Roll')

    def test_dictionary_schema_does_not_claim_paid_app_is_free(self):
        doc = Document('/biblical-dict/')
        faq = [json.loads(body) for attrs, body in doc.scripts
               if attrs.get('type') == 'application/ld+json' and json.loads(body).get('@type') == 'FAQPage']
        for schema in faq:
            for item in schema['mainEntity']:
                if item['name'] == '무료인가요?':
                    answer = item['acceptedAnswer']['text']
                    self.assertNotIn('모든 기능을 무료', answer)
                    self.assertIn('유료', answer)

    def test_sitemap_includes_every_landing_language(self):
        tree = ET.parse(ROOT / 'sitemap.xml')
        ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
        urls = {v.text for v in tree.findall('s:url/s:loc', ns)}
        for path in [*HOME.values(), *SELAH.values(), *CAMERA.values(), '/biblical-dict/']:
            self.assertIn(ORIGIN + path, urls)

    def test_camera_document_links_preserve_the_selected_language(self):
        for lang, path in CAMERA.items():
            with self.subTest(path=path):
                for anchor in Document(path).attrs('a'):
                    url = urlsplit(anchor.get('href', ''))
                    if url.path in ['/receipt-cam/terms/', '/receipt-cam/privacy/', '/receipt-cam/support/']:
                        self.assertEqual(parse_qs(url.query).get('lang'), [lang])

    def test_camera_document_language_query_overrides_browser_language(self):
        runner = """
const vm = require('node:vm');
const fs = require('node:fs');
const input = JSON.parse(fs.readFileSync(0,'utf8'));
let results = [];
for (const item of input) {
 const select = {value:'',addEventListener:()=>{}};
 const heading = {textContent:''};
 const document = {documentElement:{lang:'en'},title:'',
   getElementById:id=>id==='lang-select'?select:heading,querySelectorAll:()=>[]};
 const location = {search:'?lang='+item.lang};
 const context = {document,URLSearchParams,location,window:{location},navigator:{language:'en-US'}};
 for (const script of item.scripts) vm.runInNewContext(script,context);
 results.push({path:item.path,want:item.want,got:document.documentElement.lang,selected:select.value});
}
process.stdout.write(JSON.stringify(results));
"""
        cases = []
        for path in ['/receipt-cam/privacy/', '/receipt-cam/terms/', '/receipt-cam/support/']:
            scripts = [body for attrs, body in Document(path).scripts if not attrs.get('type') and not attrs.get('src')]
            for lang in CAMERA:
                cases.append({'path': path, 'lang': lang, 'want': lang, 'scripts': scripts})
            cases.extend({'path': path, 'lang': lang, 'want': want, 'scripts': scripts}
                         for lang, want in [('pt', 'pt-PT'), ('invalid', 'en'), ('__proto__', 'en')])
        result = subprocess.run(['node', '-e', runner], input=json.dumps(cases), text=True, capture_output=True, check=True)
        for item in json.loads(result.stdout):
            with self.subTest(path=item['path'], want=item['want']):
                self.assertEqual(item['got'], item['want'])
                self.assertEqual(item['selected'], item['want'])

    def test_landing_links_and_assets_resolve_in_published_tree(self):
        paths = set([*HOME.values(), *SELAH.values(), *CAMERA.values(), '/biblical-dict/'])
        for path in paths:
            with self.subTest(path=path):
                for tag, attrs in Document(path).tags:
                    keys = ['src', 'href'] if tag in ['a', 'link', 'script', 'img', 'source'] else []
                    for key in keys:
                        url = attrs.get(key, '')
                        parsed = urlsplit(url)
                        if not url or parsed.scheme or parsed.netloc or not parsed.path:
                            continue
                        target = ROOT / unquote(parsed.path).lstrip('/') if parsed.path.startswith('/') else ROOT / path.lstrip('/') / unquote(parsed.path)
                        if target.is_dir():
                            target = target / 'index.html'
                        self.assertTrue(target.is_file(), f'{path}: broken {tag} {key}: {url}')


if __name__ == '__main__':
    unittest.main()
