@echo off
title Barro Website - keep this window open while using the site
cd /d "C:\Users\Andrej\barro"

REM --- If the site is already running, just open the browser and exit ---
netstat -ano | findstr ":3000" | findstr "LISTENING" >nul 2>&1
if not errorlevel 1 (
    echo Barro is already running. Opening it in your browser...
    start "" "http://localhost:3000"
    timeout /t 2 >nul
    exit /b
)

echo.
echo   ============================================
echo     Starting the BARRO website...
echo   ============================================
echo.
echo   Your browser will open automatically in a few seconds.
echo   If it does not, go to:  http://localhost:3000
echo.
echo   KEEP THIS WINDOW OPEN while you use the site.
echo   To stop the site, just close this window.
echo.

REM --- Open the browser after a short delay, in the background ---
start "" /b cmd /c "ping -n 6 127.0.0.1 >nul & start "" "http://localhost:3000""

REM --- Start the production server (keeps running in this window) ---
call npm run start
