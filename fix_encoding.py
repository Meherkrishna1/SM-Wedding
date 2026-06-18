import os

def fix_encoding(filepath):
    if not os.path.exists(filepath):
        return
        
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        
    # The bytes were read as utf-8 but they were originally written as cp1252/ANSI.
    # Actually, simpler: just do string replace on the broken representations.
    content = content.replace('â€”', '—')
    content = content.replace('âœ¦', '✦')
    content = content.replace('Â·', '·')
    content = content.replace('â†“', '↓')
    content = content.replace('â€™', '’')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

fix_encoding('index.html')
fix_encoding('script.js')

css_path = 'style.css'
if os.path.exists(css_path):
    with open(css_path, 'r', encoding='utf-8') as f:
        css = f.read()
        
    css = css.replace('width: 160px;\n  height: 160px;\n  border-radius: 50%;', 'width: 240px;\n  height: 240px;\n  border-radius: 50%;')
    css = css.replace('width: 160px; height: 160px; border-radius: 50%;', 'width: 240px; height: 240px; border-radius: 50%;')
    css = css.replace('width: 130px; height: 130px;', 'width: 180px; height: 180px;')
    css = css.replace('bottom: 2rem;', 'bottom: 0.5rem;')
    
    with open(css_path, 'w', encoding='utf-8') as f:
        f.write(css)

print("Fixed encoding and CSS sizes successfully.")
