# Zeta - Windows one-shot installer (PowerShell)
# Usage: irm https://linxira-os.github.io/install.ps1 | iex
# Downloads the latest zeta-windows-x64.exe from GitHub Releases to %LOCALAPPDATA%\Zeta\,
# and creates a zeta.cmd launcher in the user profile.
# NOTE: ASCII-only on purpose so it parses identically under Windows PowerShell 5.1 and 7
# in any system locale, whether run via irm|iex, -File, or dot-sourcing.

$ErrorActionPreference = "Stop"
# GitHub API/downloads require TLS 1.2+ (older Windows PowerShell may default lower)
[Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12
$Repo = "Linxira-OS/linxira-zeta"
$Api = "https://api.github.com/repos/$Repo/releases/latest"
$Asset = "zeta-windows-x64.exe"

Write-Host "Zeta Windows installer" -ForegroundColor Cyan

# ---- resolve version ----
try {
    $Release = Invoke-RestMethod -Uri $Api -Headers @{ "User-Agent" = "zeta-install" } -TimeoutSec 30
    $Version = $Release.tag_name
} catch {
    Write-Host "Could not resolve the latest version (GitHub API unreachable?): $($_.Exception.Message)" -ForegroundColor Red
    throw
}
Write-Host "Version: $Version"

$Url = "https://github.com/$Repo/releases/download/$Version/$Asset"
$LocalAppData = $env:LOCALAPPDATA
if (-not $LocalAppData) { $LocalAppData = Join-Path $env:USERPROFILE "AppData\Local" }
$DestDir = Join-Path $LocalAppData "Zeta"
$Dest = Join-Path $DestDir "zeta.exe"
$ShimDir = Join-Path $env:USERPROFILE ".zeta\bin"
$Shim = Join-Path $ShimDir "zeta.cmd"

New-Item -ItemType Directory -Force -Path $DestDir | Out-Null
New-Item -ItemType Directory -Force -Path $ShimDir | Out-Null

Write-Host "Downloading $Asset ..."
try {
    Invoke-WebRequest -Uri $Url -OutFile $Dest -UseBasicParsing -TimeoutSec 900
} catch {
    Write-Host "Download failed: $Url" -ForegroundColor Red
    Write-Host "(If the network is restricted, download the asset manually from GitHub Releases.)"
    throw
}

# ---- zeta.cmd launcher ----
$cmd = "@echo off`r`n`"$Dest`" %*`r`n"
Set-Content -Path $Shim -Value $cmd -Encoding ASCII
Write-Host "Launcher: $Shim"

# ---- PATH ----
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($userPath -notlike "*$ShimDir*") {
    $newPath = "$userPath;$ShimDir"
    if (-not $userPath) { $newPath = $ShimDir }
    [Environment]::SetEnvironmentVariable("Path", $newPath, "User")
    Write-Host "Added $ShimDir to the user PATH (effective in new terminals)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Installed: $Dest" -ForegroundColor Green
& $Dest --version
Write-Host "Open a new terminal and run zeta."
