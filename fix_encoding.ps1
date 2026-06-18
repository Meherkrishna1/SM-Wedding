$ErrorActionPreference = "Stop"

function Fix-Encoding {
    param([string]$path)
    
    if (Test-Path $path) {
        $content = Get-Content -Path $path -Raw -Encoding UTF8
        
        $content = $content.Replace("â€”", "—")
        $content = $content.Replace("âœ¦", "✦")
        $content = $content.Replace("Â·", "·")
        $content = $content.Replace("â†“", "↓")
        $content = $content.Replace("â€™", "’")
        
        Set-Content -Path $path -Value $content -Encoding UTF8
    }
}

Fix-Encoding "d:\Meher\SM Wedding website\index.html"
Fix-Encoding "d:\Meher\SM Wedding website\script.js"

$cssPath = "d:\Meher\SM Wedding website\style.css"
if (Test-Path $cssPath) {
    $css = Get-Content -Path $cssPath -Raw -Encoding UTF8
    
    $css = $css -replace "width: 160px;\s*height: 160px;\s*border-radius: 50%;", "width: 260px; height: 260px; border-radius: 50%;"
    $css = $css -replace "width: 130px;\s*height: 130px;", "width: 200px; height: 200px;"
    $css = $css -replace "width: 160px;\r?\n\s*height: 160px;", "width: 260px;`n  height: 260px;"
    $css = $css -replace "bottom: 2rem;", "bottom: 0.5rem;"
    
    Set-Content -Path $cssPath -Value $css -Encoding UTF8
}

Write-Host "Encoding and CSS sizes/positions fixed."
