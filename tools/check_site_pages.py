"""Check local page links, company identity and search metadata before publishing."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
from collections import Counter
import json
import re
import xml.etree.ElementTree as ET

root=Path(__file__).resolve().parents[1]
files=['index.html','workflow-automation.html','business-systems-integration.html','ai-document-assistants.html','martech-services.html','contact.html']
base='https://www.autonoalabs.com/'
class Page(HTMLParser):
 def __init__(self):super().__init__();self.ids=[];self.refs=[];self.canonical=[];self.h1=0;self.meta={};self.icons=[];self.manifests=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.append(a['id'])
  if tag=='h1':self.h1+=1
  if tag=='link' and a.get('rel')=='canonical':self.canonical.append(a.get('href'))
  if tag=='link' and a.get('rel')=='icon':self.icons.append(a)
  if tag=='link' and a.get('rel')=='manifest':self.manifests.append(a.get('href'))
  if tag=='meta':self.meta[a.get('name') or a.get('property')]=a.get('content')
  for key in ['src','href','srcset']:
   if key in a:self.refs.append(a[key])
pages={}
for file in files:
 p=Page();p.feed((root/file).read_text(encoding='utf-8'));pages[file]=p
 assert p.h1==1,(file,'Expected one primary heading')
 assert not [key for key,n in Counter(p.ids).items() if n>1],(file,'Duplicate IDs')
 assert p.canonical==[base+('' if file=='index.html' else file)],(file,'Canonical URL')
 assert p.meta.get('description') and p.meta.get('og:title') and p.meta.get('og:url'),(file,'Search/social metadata')
 assert any(i.get('href')=='favicon.png' and i.get('sizes')=='96x96' and i.get('type')=='image/png' for i in p.icons),(file,'Missing Google-compatible favicon')
 assert any(i.get('href')=='favicon.ico' for i in p.icons),(file,'Missing browser favicon fallback')
 assert p.manifests==['site.webmanifest'],(file,'Missing app manifest')
 text=(root/file).read_text(encoding='utf-8')
 assert 'Autonoa Labs Private Limited' in text and 'Bhiwandi, Maharashtra' in text,(file,'Visible business identity')
 for source in re.findall(r'<script type="application/ld\+json">(.*?)</script>',text,re.S):
  data=json.loads(source)
  org=next(node for node in data['@graph'] if node['@type']=='Organization')
  assert org['legalName']=='Autonoa Labs Private Limited' and org['email']=='contact@autonoalabs.com'
  assert not any(node['@type']=='LocalBusiness' for node in data['@graph']),'Do not imply an unverified storefront or Maps listing'
for file,p in pages.items():
 for ref in p.refs:
  u=urlsplit(ref)
  if u.scheme or u.netloc:continue
  path=unquote(u.path) or file
  assert (root/path).exists(),(file,ref,'Missing local target')
  if u.fragment and path.endswith('.html'):
   target=pages.get(path)
   if target:assert u.fragment in target.ids,(file,ref,'Missing section')
sitemap=ET.parse(root/'sitemap.xml')
urls=[n.text for n in sitemap.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
assert set(urls)=={base+('' if f=='index.html' else f) for f in files}
assert len(urls)==len(set(urls))
assert 'Sitemap: '+base+'sitemap.xml' in (root/'robots.txt').read_text()
manifest=json.loads((root/'site.webmanifest').read_text())
assert {i['sizes'] for i in manifest['icons']}=={'192x192','512x512'}
for icon in manifest['icons']:
 data=(root/icon['src'].lstrip('/')).read_bytes()
 assert data[:8]==b'\x89PNG\r\n\x1a\n' and icon['type']=='image/png'
 dimensions=(int.from_bytes(data[16:20],'big'),int.from_bytes(data[20:24],'big'))
 assert dimensions[0]==dimensions[1] and icon['sizes']==f'{dimensions[0]}x{dimensions[1]}'
favicon=(root/'favicon.png').read_bytes()
assert favicon[:8]==b'\x89PNG\r\n\x1a\n' and int.from_bytes(favicon[16:20],'big')==int.from_bytes(favicon[20:24],'big')==96
assert (root/'favicon.ico').read_bytes()[:4]==b'\x00\x00\x01\x00'
print('Verified six pages: local links, headings, metadata, identity, sitemap, favicon discovery and icon formats/sizes.')
