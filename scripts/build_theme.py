import os
import json
import xml.etree.ElementTree as ET

from theme_css import THEME_CSS
from theme_js import get_theme_js
from theme_html import get_theme_xml

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.dirname(BASE_DIR)
SAMPLE_DATA_FILE = os.path.join(BASE_DIR, "sample_data.json")

with open(SAMPLE_DATA_FILE, "r", encoding="utf-8") as f:
    sample_sites = json.load(f)

sample_sites_json = json.dumps(sample_sites).replace("</script>", "<\\/script>")

theme_js = get_theme_js(sample_sites_json)
theme_xml = get_theme_xml(THEME_CSS, theme_js)
theme_xml = theme_xml.replace('&rarr;', '→').replace('&larr;', '←')

output_path = os.path.join(ROOT_DIR, "guest-posting-saas-blogger-theme.xml")

with open(output_path, "w", encoding="utf-8") as f:
    f.write(theme_xml)

print(f"Generated theme file: {output_path} ({len(theme_xml)} bytes)")

# Validate XML syntax
try:
    # Check basic XML structure
    ET.fromstring(theme_xml)
    print("XML Validation SUCCESS: The Blogger theme XML is 100% syntactically valid!")
except ET.ParseError as e:
    print(f"XML Validation ERROR: {e}")
    exit(1)
