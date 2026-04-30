# PowerShell-friendly build script for MusicTech paper.
# Usage:    .\build.ps1
#           .\build.ps1 clean

param([string]$cmd = "build")

$ErrorActionPreference = "Stop"
Set-Location -Path $PSScriptRoot

if ($cmd -eq "clean") {
    Get-ChildItem -Filter "main.*" |
        Where-Object { $_.Extension -in ".aux", ".bbl", ".blg", ".log",
                        ".out", ".toc", ".fls", ".fdb_latexmk", ".synctex.gz" } |
        Remove-Item -Force
    Write-Host "Build artefacts cleaned."
    return
}

Write-Host "==> pdflatex (1/3)"
pdflatex -interaction=nonstopmode main.tex | Out-Null
Write-Host "==> bibtex"
bibtex main | Out-Null
Write-Host "==> pdflatex (2/3)"
pdflatex -interaction=nonstopmode main.tex | Out-Null
Write-Host "==> pdflatex (3/3)"
pdflatex -interaction=nonstopmode main.tex | Out-Null

if (Test-Path "main.pdf") {
    Write-Host "OK -> main.pdf"
} else {
    Write-Error "Build failed. Inspect main.log."
}
