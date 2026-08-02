[CmdletBinding()]
param(
    [string]$RemoteHost = '162.241.60.255',
    [int]$RemotePort = 3306,
    [string]$RemoteDatabase = 'convexo1_pedidos',
    [string]$RemoteUser = 'convexo1_pedidos',
    [string]$LocalHostName = '127.0.0.1',
    [int]$LocalPort = 3306,
    [string]$LocalDatabase = 'pedidos',
    [string]$LocalUser = 'root',
    [string]$MySqlBin = 'C:\laragon\bin\mysql\mysql-8.4.3-winx64\bin',
    [string]$PhpExe = 'C:\laragon\bin\php\php-8.3.30-Win32-vs16-x64\php.exe',
    [switch]$PromptLocalPassword,
    [switch]$Force
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

function ConvertTo-PlainText {
    param([Security.SecureString]$SecureValue)

    $pointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($SecureValue)
    try {
        return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($pointer)
    }
    finally {
        [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($pointer)
    }
}

function Quote-NativeArgument {
    param([string]$Value)

    if ($Value -notmatch '[\s"]') {
        return $Value
    }

    return '"' + ($Value -replace '(\\*)"', '$1$1\"' -replace '(\\+)$', '$1$1') + '"'
}

function Invoke-Native {
    param(
        [string]$FilePath,
        [string[]]$Arguments,
        [string]$Password,
        [switch]$CaptureOutput
    )

    $startInfo = [Diagnostics.ProcessStartInfo]::new()
    $startInfo.FileName = $FilePath
    $startInfo.Arguments = (($Arguments | ForEach-Object { Quote-NativeArgument $_ }) -join ' ')
    $startInfo.UseShellExecute = $false
    $startInfo.CreateNoWindow = $true
    $startInfo.EnvironmentVariables['MYSQL_PWD'] = $Password

    $startInfo.RedirectStandardError = $true
    if ($CaptureOutput) {
        $startInfo.RedirectStandardOutput = $true
    }

    $process = [Diagnostics.Process]::new()
    $process.StartInfo = $startInfo
    [void]$process.Start()

    $stdout = ''
    $stderr = ''
    if ($CaptureOutput) {
        $stdout = $process.StandardOutput.ReadToEnd()
    }
    $stderr = $process.StandardError.ReadToEnd()

    $process.WaitForExit()
    if ($process.ExitCode -ne 0) {
        if ($stderr) {
            Write-Error $stderr.Trim()
        }
        throw "El comando $([IO.Path]::GetFileName($FilePath)) termino con codigo $($process.ExitCode)."
    }

    if ($CaptureOutput) {
        return $stdout.Trim()
    }
}

function Invoke-MySqlScript {
    param(
        [string]$MySqlExe,
        [string]$HostName,
        [int]$Port,
        [string]$User,
        [string]$Password,
        [string]$Database,
        [string]$SqlFile
    )

    $arguments = @(
        "--host=$HostName",
        "--port=$Port",
        "--user=$User",
        '--default-character-set=utf8mb4',
        '--binary-mode',
        "--database=$Database"
    )

    $startInfo = [Diagnostics.ProcessStartInfo]::new()
    $startInfo.FileName = $MySqlExe
    $startInfo.Arguments = (($arguments | ForEach-Object { Quote-NativeArgument $_ }) -join ' ')
    $startInfo.UseShellExecute = $false
    $startInfo.CreateNoWindow = $true
    $startInfo.RedirectStandardInput = $true
    $startInfo.RedirectStandardError = $true
    $startInfo.EnvironmentVariables['MYSQL_PWD'] = $Password

    $process = [Diagnostics.Process]::new()
    $process.StartInfo = $startInfo
    [void]$process.Start()

    $inputFile = [IO.File]::OpenRead([IO.Path]::GetFullPath($SqlFile))
    try {
        $inputFile.CopyTo($process.StandardInput.BaseStream)
        $process.StandardInput.Close()
    }
    finally {
        $inputFile.Dispose()
    }

    $stderr = $process.StandardError.ReadToEnd()
    $process.WaitForExit()
    if ($process.ExitCode -ne 0) {
        if ($stderr) {
            Write-Error $stderr.Trim()
        }
        throw "La importacion termino con codigo $($process.ExitCode)."
    }
}

$projectRoot = Split-Path -Parent $PSScriptRoot
$mysqlExe = Join-Path $MySqlBin 'mysql.exe'
$mysqldumpExe = Join-Path $MySqlBin 'mysqldump.exe'
$backupDirectory = Join-Path $projectRoot 'storage\app\database-sync'

foreach ($requiredFile in @($mysqlExe, $mysqldumpExe, $PhpExe, (Join-Path $projectRoot 'artisan'))) {
    if (-not (Test-Path -LiteralPath $requiredFile -PathType Leaf)) {
        throw "No se encontro el archivo requerido: $requiredFile"
    }
}

if (($RemoteHost -eq $LocalHostName) -and ($RemotePort -eq $LocalPort) -and ($RemoteDatabase -eq $LocalDatabase)) {
    throw 'La base remota y la local no pueden ser el mismo destino.'
}

New-Item -ItemType Directory -Path $backupDirectory -Force | Out-Null
$timestamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$localBackup = Join-Path $backupDirectory "local-$LocalDatabase-$timestamp.sql"
$remoteDump = Join-Path $backupDirectory "remote-$RemoteDatabase-$timestamp.sql"

Write-Host "Origen : ${RemoteHost}:$RemotePort/$RemoteDatabase"
Write-Host "Destino: ${LocalHostName}:$LocalPort/$LocalDatabase"
Write-Host "Copias : $backupDirectory"
Write-Host ''

$remoteSecurePassword = Read-Host "Contrasena remota de $RemoteUser" -AsSecureString
$remotePassword = ConvertTo-PlainText $remoteSecurePassword
$localPassword = ''
if ($PromptLocalPassword) {
    $localSecurePassword = Read-Host "Contrasena local de $LocalUser" -AsSecureString
    $localPassword = ConvertTo-PlainText $localSecurePassword
}

try {
    Write-Host '1/5 Validando las conexiones...'
    $remoteVersion = Invoke-Native -FilePath $mysqlExe -Password $remotePassword -CaptureOutput -Arguments @(
        "--host=$RemoteHost", "--port=$RemotePort", "--user=$RemoteUser",
        '--batch', '--skip-column-names', "--database=$RemoteDatabase",
        '--execute=SELECT VERSION(), DATABASE();'
    )
    $localVersion = Invoke-Native -FilePath $mysqlExe -Password $localPassword -CaptureOutput -Arguments @(
        "--host=$LocalHostName", "--port=$LocalPort", "--user=$LocalUser",
        '--batch', '--skip-column-names', "--database=$LocalDatabase",
        '--execute=SELECT VERSION(), DATABASE();'
    )
    Write-Host "  Remota: $remoteVersion"
    Write-Host "  Local : $localVersion"

    Write-Host '2/5 Exportando la base remota...'
    Invoke-Native -FilePath $mysqldumpExe -Password $remotePassword -Arguments @(
        "--host=$RemoteHost", "--port=$RemotePort", "--user=$RemoteUser",
        '--single-transaction', '--quick', '--routines', '--triggers', '--events',
        '--hex-blob', '--default-character-set=utf8mb4', '--set-gtid-purged=OFF',
        '--skip-column-statistics', '--no-tablespaces', '--skip-lock-tables',
        "--result-file=$remoteDump", $RemoteDatabase
    )
    if ((Get-Item -LiteralPath $remoteDump).Length -eq 0) {
        throw 'La exportacion remota produjo un archivo vacio.'
    }

    Write-Host '3/5 Respaldando la base local...'
    Invoke-Native -FilePath $mysqldumpExe -Password $localPassword -Arguments @(
        "--host=$LocalHostName", "--port=$LocalPort", "--user=$LocalUser",
        '--single-transaction', '--quick', '--routines', '--triggers', '--events',
        '--hex-blob', '--default-character-set=utf8mb4', '--set-gtid-purged=OFF',
        '--skip-column-statistics', '--no-tablespaces',
        "--result-file=$localBackup", $LocalDatabase
    )
    if ((Get-Item -LiteralPath $localBackup).Length -eq 0) {
        throw 'El respaldo local produjo un archivo vacio. No se modifico la base local.'
    }

    if (-not $Force) {
        Write-Warning "Se reemplazaran todos los datos de la base local '$LocalDatabase'."
        $confirmation = Read-Host 'Escribe ACTUALIZAR para continuar'
        if ($confirmation -cne 'ACTUALIZAR') {
            Write-Host 'Operacion cancelada. Los archivos exportados se conservaron.'
            exit 0
        }
    }

    Write-Host '4/5 Reemplazando la base local...'
    $escapedDatabase = $LocalDatabase -replace '`', '``'
    $resetSql = "DROP DATABASE IF EXISTS ``$escapedDatabase``; CREATE DATABASE ``$escapedDatabase`` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
    Invoke-Native -FilePath $mysqlExe -Password $localPassword -Arguments @(
        "--host=$LocalHostName", "--port=$LocalPort", "--user=$LocalUser",
        "--execute=$resetSql"
    )
    Invoke-MySqlScript -MySqlExe $mysqlExe -HostName $LocalHostName -Port $LocalPort -User $LocalUser -Password $localPassword -Database $LocalDatabase -SqlFile $remoteDump

    Write-Host '5/5 Verificando y limpiando la cache de Laravel...'
    $tableCount = Invoke-Native -FilePath $mysqlExe -Password $localPassword -CaptureOutput -Arguments @(
        "--host=$LocalHostName", "--port=$LocalPort", "--user=$LocalUser",
        '--batch', '--skip-column-names', "--database=$LocalDatabase",
        "--execute=SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = DATABASE();"
    )
    & $PhpExe (Join-Path $projectRoot 'artisan') optimize:clear
    if ($LASTEXITCODE -ne 0) {
        throw 'La base se importo, pero no fue posible limpiar la cache de Laravel.'
    }

    Write-Host ''
    Write-Host 'Sincronizacion terminada correctamente.' -ForegroundColor Green
    Write-Host "Tablas locales: $tableCount"
    Write-Host "Respaldo local: $localBackup"
    Write-Host "Copia remota : $remoteDump"
}
finally {
    $remotePassword = $null
    $localPassword = $null
    Remove-Variable remoteSecurePassword, localSecurePassword -ErrorAction SilentlyContinue
}
