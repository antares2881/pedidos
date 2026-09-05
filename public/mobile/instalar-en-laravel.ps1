param(
    [string]$Destino = "C:\laragon\www\pedidos\public\mobile"
)

$origen = $PSScriptRoot
$destinoCompleto = [System.IO.Path]::GetFullPath($Destino)

if (-not (Test-Path -LiteralPath $destinoCompleto)) {
    New-Item -ItemType Directory -Path $destinoCompleto | Out-Null
}

Get-ChildItem -LiteralPath $origen -Force |
    Where-Object { $_.Name -ne 'instalar-en-laravel.ps1' } |
    Copy-Item -Destination $destinoCompleto -Recurse -Force

Write-Host "Pedidos Móvil quedó publicado en: $destinoCompleto"
Write-Host "Abra: http://pedidos.test/mobile/ (o el dominio de su servidor)"
