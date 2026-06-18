const fs = require('fs');

function fixFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    
    // The specific bad sequences that were written
    content = content.replace(/â€”/g, '—');
    content = content.replace(/âœ¦/g, '✦');
    content = content.replace(/Â·/g, '·');
    content = content.replace(/â†“/g, '↓');
    
    fs.writeFileSync(filePath, content, 'utf8');
}

fixFile('index.html');
fixFile('script.js');

let css = fs.readFileSync('style.css', 'utf8');
css = css.replace(/width: 160px;\s*height: 160px;\s*border-radius: 50%;/g, 'width: 260px; height: 260px; border-radius: 50%;');
css = css.replace(/width: 130px;\s*height: 130px;/g, 'width: 200px; height: 200px;');
css = css.replace(/width: 160px;\r?\n\s*height: 160px;/g, 'width: 260px;\n  height: 260px;');
css = css.replace(/bottom: 2rem;/g, 'bottom: 0.5rem;');
fs.writeFileSync('style.css', css, 'utf8');

console.log('Fixed encoding and adjusted CSS sizes/positions');
