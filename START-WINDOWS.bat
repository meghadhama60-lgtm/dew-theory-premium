@echo off
cd /d "%~dp0"
echo =============================================
echo   DEW THEORY - Premium Skincare Storefront
echo =============================================
echo.
where node >nul 2>nul
if errorlevel 1 goto no_node
if not exist node_modules (
  echo Installing project packages for first run...
  call npm install
  if errorlevel 1 goto install_error
)
echo.
echo Starting Dew Theory...
echo Keep this window open while using the website.
echo.
call npm run dev
pause
goto end
:no_node
echo Node.js was not found. Install the LTS version from https://nodejs.org/ and then run this file again.
pause
goto end
:install_error
echo Package installation did not complete. Check your internet connection, then try npm install in this folder.
pause
:end
