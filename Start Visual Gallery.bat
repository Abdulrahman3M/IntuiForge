@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js 18 or newer is required. Install Node.js, then run this file again.
  pause
  exit /b 1
)
echo IntuiForge Visual Gallery is running locally at:
echo http://127.0.0.1:4173/packages/visualization-legacy/visual-browser.html
echo This server accepts loopback requests only. Press Ctrl+C to stop it.
node tests\browser-server.mjs
endlocal
