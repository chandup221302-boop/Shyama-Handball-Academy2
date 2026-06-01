import os
import glob
import re

html_files = glob.glob('d:/New Desktop/Shyama Handball Academy 02/*.html')
for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern to replace the image with text
    pattern = r'<img\s+src="SN\s+Pandey\s+Handball\s+Khel\s+Sansthan\s+Logo\s+\(1\)\.png"\s+alt="S\.N\.\s+Pandey\s+Trust\s+Logo"\s+class="logo-2">'
    
    # Text to replace it with
    replacement = r'<span class="academy-name-text" style="color: #f8fafc; font-weight: 800; font-size: 1.1rem; text-transform: uppercase; letter-spacing: 0.5px; line-height: 1.2; max-width: 150px; display: inline-block;">Shyama Handball Academy</span>'

    new_content = re.sub(pattern, replacement, content)

    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file}")

print('Replaced in all files')
