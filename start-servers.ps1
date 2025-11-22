# Quick Start Script for Backend Migration
# This script helps you start both servers easily

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Phone Store - Backend Migration" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
$projectRoot = "e:\laragon\www\Clones\ReactProject"
if (-not (Test-Path $projectRoot)) {
    Write-Host "❌ Project directory not found: $projectRoot" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Project directory found" -ForegroundColor Green
Write-Host ""

# Check if MySQL is running (Laragon)
Write-Host "📊 Checking MySQL connection..." -ForegroundColor Yellow
Set-Location "$projectRoot\src\backend"

try {
    $testResult = node test-db.js 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Database connection successful!" -ForegroundColor Green
    } else {
        Write-Host "❌ Database connection failed!" -ForegroundColor Red
        Write-Host "Please make sure:" -ForegroundColor Yellow
        Write-Host "  1. Laragon is running" -ForegroundColor Yellow
        Write-Host "  2. MySQL service is started" -ForegroundColor Yellow
        Write-Host "  3. Database 'phonestore' exists" -ForegroundColor Yellow
        exit 1
    }
} catch {
    Write-Host "❌ Error testing database: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Starting Servers" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "📝 Instructions:" -ForegroundColor Yellow
Write-Host "  1. Backend will start on: http://localhost:4000" -ForegroundColor White
Write-Host "  2. Frontend will start on: http://localhost:5173 (or next available port)" -ForegroundColor White
Write-Host "  3. Open TWO separate PowerShell windows and run:" -ForegroundColor White
Write-Host ""
Write-Host "     Terminal 1 (Backend):" -ForegroundColor Cyan
Write-Host "     cd $projectRoot\src\backend" -ForegroundColor Gray
Write-Host "     node server.js" -ForegroundColor Gray
Write-Host ""
Write-Host "     Terminal 2 (Frontend):" -ForegroundColor Cyan
Write-Host "     cd $projectRoot" -ForegroundColor Gray
Write-Host "     npm run dev" -ForegroundColor Gray
Write-Host ""

$choice = Read-Host "Would you like to start the backend server now? (y/n)"
if ($choice -eq 'y' -or $choice -eq 'Y') {
    Write-Host ""
    Write-Host "🚀 Starting backend server on port 4000..." -ForegroundColor Green
    Write-Host "   Press Ctrl+C to stop the server" -ForegroundColor Yellow
    Write-Host ""
    Set-Location "$projectRoot\src\backend"
    node server.js
} else {
    Write-Host ""
    Write-Host "✅ Setup verification complete!" -ForegroundColor Green
    Write-Host "   You can start the servers manually using the commands above." -ForegroundColor White
}
