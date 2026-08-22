Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

$baseDir = "d:\NTT_WEBSITE\dsr-event-planner\public\images"

$dirs = @(
    "hero",
    "services",
    "gallery\birthday",
    "gallery\government",
    "gallery\cultural",
    "gallery\wedding",
    "gallery\haldi",
    "about",
    "logo",
    "misc"
)

foreach ($d in $dirs) {
    $path = Join-Path $baseDir $d
    if (-not (Test-Path $path)) {
        New-Item -ItemType Directory -Path $path -Force | Out-Null
    }
}

$downloads = @(
    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/08/w4.webp'; Out = 'hero\w4.webp' },
    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/08/w25.webp'; Out = 'hero\w25.webp' },
    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/08/w6.webp'; Out = 'hero\w6.webp' },
    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/08/h2-img.webp'; Out = 'hero\h2-img.webp' },
    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/08/h4-img.webp'; Out = 'hero\h4-img.webp' },
    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/08/h11.webp'; Out = 'hero\h11.webp' },
    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/08/w15.webp'; Out = 'hero\w15.webp' },
    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/08/w16.webp'; Out = 'hero\w16.webp' },

    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/08/s1.webp'; Out = 'services\s1.webp' },
    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/08/s2.webp'; Out = 'services\s2.webp' },
    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/08/s3.webp'; Out = 'services\s3.webp' },

    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/08/hm-abt-img.webp'; Out = 'about\hm-abt-img.webp' },
    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/07/abt-img2.webp'; Out = 'about\abt-img2.webp' },
    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/07/why-img.webp'; Out = 'about\why-img.webp' },

    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/08/b1.webp'; Out = 'gallery\birthday\b1.webp' },
    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/08/b2.webp'; Out = 'gallery\birthday\b2.webp' },
    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/08/b3.webp'; Out = 'gallery\birthday\b3.webp' },
    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/08/b4.webp'; Out = 'gallery\birthday\b4.webp' },
    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/08/b5.webp'; Out = 'gallery\birthday\b5.webp' },
    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/08/b6.webp'; Out = 'gallery\birthday\b6.webp' },

    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/07/g1.webp'; Out = 'gallery\government\g1.webp' },
    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/07/g2.webp'; Out = 'gallery\government\g2.webp' },
    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/07/g3.webp'; Out = 'gallery\government\g3.webp' },
    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/07/g4.webp'; Out = 'gallery\government\g4.webp' },
    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/07/g5.webp'; Out = 'gallery\government\g5.webp' },
    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/07/g6.webp'; Out = 'gallery\government\g6.webp' },

    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/08/c1.webp'; Out = 'gallery\cultural\c1.webp' },
    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/08/c2.webp'; Out = 'gallery\cultural\c2.webp' },

    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/08/w1.webp'; Out = 'gallery\wedding\w1.webp' },
    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/08/w2.webp'; Out = 'gallery\wedding\w2.webp' },
    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/08/w3.webp'; Out = 'gallery\wedding\w3.webp' },
    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/08/w4.webp'; Out = 'gallery\wedding\w4.webp' },
    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/08/w5.webp'; Out = 'gallery\wedding\w5.webp' },
    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/08/w6.webp'; Out = 'gallery\wedding\w6.webp' },

    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/08/h1.webp'; Out = 'gallery\haldi\h1.webp' },
    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/08/h2.webp'; Out = 'gallery\haldi\h2.webp' },
    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/08/h3.webp'; Out = 'gallery\haldi\h3.webp' },
    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/08/h4.webp'; Out = 'gallery\haldi\h4.webp' },
    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/08/h5.webp'; Out = 'gallery\haldi\h5.webp' },
    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/08/h6.webp'; Out = 'gallery\haldi\h6.webp' },

    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/08/DSR_LOGO_no_bg.png'; Out = 'logo\dsr-logo.png' },
    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/08/DSR-EVENTS-WITHOUT-FRAME-scaled.png'; Out = 'logo\dsr-events-badge.png' },
    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/08/25years-img.png'; Out = 'logo\25years-badge.png' },

    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/08/wedding-day-icon.png'; Out = 'misc\wedding-icon.png' },
    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/08/event.png'; Out = 'misc\event-icon.png' },
    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/08/paint.png'; Out = 'misc\paint-icon.png' },
    @{ Url = 'https://dsreventplanner.com/wp-content/uploads/2025/11/Untitled-design-3-1024x576.jpg'; Out = 'misc\promo-banner.jpg' }
)

$results = @()

foreach ($item in $downloads) {
    $dest = Join-Path $baseDir $item.Out
    try {
        Invoke-WebRequest -Uri $item.Url -OutFile $dest -UserAgent 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' -TimeoutSec 30 -ErrorAction Stop
        $fi = Get-Item $dest
        $results += [PSCustomObject]@{
            File = $item.Out
            Status = 'SUCCESS'
            SizeKB = [math]::Round($fi.Length / 1KB, 2)
            Error = ''
        }
    } catch {
        $results += [PSCustomObject]@{
            File = $item.Out
            Status = 'FAILED'
            SizeKB = 0
            Error = $_.Exception.Message
        }
    }
}

$results | Format-Table -AutoSize
$results | Export-Clixml -Path "d:\NTT_WEBSITE\dsr-event-planner\download_results.xml"
