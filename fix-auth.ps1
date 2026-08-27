
$files = Get-ChildItem -Path app -Recurse -Filter *.ts* | Select-String "getServerSession" -List | ForEach-Object { $_.Path }

foreach ($file in $files) {
    if ($file -match "app\\api\\auth") { continue }
    $content = Get-Content -LiteralPath $file -Raw
    
    # Add the import if missing
    if ($content -notmatch "import { authOptions }") {
        $content = $content -replace 'import { getServerSession } from "next-auth";', "import { getServerSession } from `"next-auth`";`nimport { authOptions } from `"@/app/api/auth/[...nextauth]/route`";"
    }
    
    # Replace getServerSession() with getServerSession(authOptions)
    $content = $content -replace "getServerSession\(\)", "getServerSession(authOptions)"
    
    Set-Content -LiteralPath $file -Value $content
}

