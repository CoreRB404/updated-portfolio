"""Check local HTML resources and lazy-loading attributes."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit, quote
from urllib.request import urlopen

ROOT = Path(__file__).resolve().parents[1]

class Resources(HTMLParser):
    count = 0
    projects = 0

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        for key in ('src', 'href'):
            value = attrs.get(key, '')
            url = urlsplit(value)
            if not url.path or url.scheme or url.netloc:
                continue
            assert (ROOT / unquote(url.path)).is_file(), value
            with urlopen('http://127.0.0.1:8000/' + quote(value, safe='/%?=')) as response:
                assert response.status == 200, value
            self.count += 1
        if 'portfolio__image' in attrs.get('class', ''):
            assert attrs.get('loading') == 'lazy'
            assert attrs.get('decoding') == 'async'
            self.projects += 1

parser = Resources()
parser.feed((ROOT / 'index.html').read_text(encoding='utf-8'))
assert parser.projects == 12, parser.projects
print(f'Checked {parser.count} local resources over HTTP and {parser.projects} lazy-loaded project images.')
