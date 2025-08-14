@echo off
REM Telnyx Text Expander Extension - Release Preparation Script
REM This script helps prepare a release ZIP file for GitHub

echo ========================================
echo  Telnyx Text Expander Release Prep
echo ========================================
echo.

REM Get version from user
set /p VERSION="Enter version (e.g., 1.0): "
if "%VERSION%"=="" (
    echo Error: Version is required
    pause
    exit /b 1
)

set FILENAME=telnyx-text-expander-v%VERSION%.zip

echo Preparing release: %FILENAME%
echo.

REM Check if required files exist
if not exist "manifest.json" (
    echo Error: manifest.json not found
    echo Make sure you're in the extension directory
    pause
    exit /b 1
)

if not exist "popup.html" (
    echo Error: popup.html not found
    pause
    exit /b 1
)

if not exist "popup.js" (
    echo Error: popup.js not found
    pause
    exit /b 1
)

if not exist "popup.css" (
    echo Error: popup.css not found
    pause
    exit /b 1
)

if not exist "content.js" (
    echo Error: content.js not found
    pause
    exit /b 1
)

if not exist "background.js" (
    echo Error: background.js not found
    pause
    exit /b 1
)

echo Checking files...
echo [✓] manifest.json
echo [✓] popup.html  
echo [✓] popup.js
echo [✓] popup.css
echo [✓] content.js
echo [✓] background.js

if exist "T.png" (
    echo [✓] T.png
) else (
    echo [!] T.png not found - extension icon missing
    pause
    exit /b 1
)

if exist "Telnyx icon.png" (
    echo [✓] Telnyx icon.png
) else (
    echo [!] Telnyx icon.png not found - will be excluded
)

if exist "Sound.mp3" (
    echo [✓] Sound.mp3
) else (
    echo [!] Sound.mp3 not found - audio feedback will be disabled
)

if exist "README.txt" (
    echo [✓] README.txt
) else (
    echo [!] README.txt not found - will be excluded
)

echo.

REM Create release folder
if exist "release-temp" rmdir /s /q "release-temp"
mkdir "release-temp"

echo Copying files to release folder...
copy "manifest.json" "release-temp\" > nul
copy "popup.html" "release-temp\" > nul
copy "popup.js" "release-temp\" > nul
copy "popup.css" "release-temp\" > nul
copy "content.js" "release-temp\" > nul
copy "background.js" "release-temp\" > nul
copy "T.png" "release-temp\" > nul

if exist "Telnyx icon.png" (
    copy "Telnyx icon.png" "release-temp\" > nul
)

if exist "Sound.mp3" (
    copy "Sound.mp3" "release-temp\" > nul
)

if exist "README.txt" (
    copy "README.txt" "release-temp\" > nul
)

echo Creating ZIP file...

REM Check if PowerShell is available for ZIP creation
powershell -command "& {Compress-Archive -Path 'release-temp\*' -DestinationPath '%FILENAME%' -Force}" 2>nul

if errorlevel 1 (
    echo.
    echo PowerShell ZIP creation failed. 
    echo Please manually create a ZIP file with the contents of the release-temp folder.
    echo Name it: %FILENAME%
    pause
) else (
    echo.
    echo ========================================
    echo  Release ZIP created successfully!
    echo ========================================
    echo.
    echo File: %FILENAME%
    echo Location: %CD%
    echo.
    echo Contents:
    echo - manifest.json ^(Extension configuration^)
    echo - popup.html ^(User interface^)
    echo - popup.js ^(Popup functionality^)
    echo - popup.css ^(Extension styling^)
    echo - content.js ^(Website interaction^)
    echo - background.js ^(Background processing^)
    echo - T.png ^(Extension icon^)
    if exist "release-temp\Telnyx icon.png" echo - Telnyx icon.png ^(Telnyx branding^)
    if exist "release-temp\Sound.mp3" echo - Sound.mp3 ^(Audio feedback^)
    if exist "release-temp\README.txt" echo - README.txt ^(User documentation^)
    echo.
    echo Next steps:
    echo 1. Go to your GitHub repository
    echo 2. Click on "Releases" 
    echo 3. Click "Create a new release"
    echo 4. Use tag: v%VERSION%
    echo 5. Upload this ZIP file as an asset
    echo 6. Fill in release notes describing new features
    echo.
    echo Extension is ready for GitHub publishing!
    echo.
)

REM Clean up
rmdir /s /q "release-temp"

echo Press any key to exit...
pause > nul