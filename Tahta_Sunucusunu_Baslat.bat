@echo off
title Geobek Akilli Tahta Sunucusu
echo Geobek yerel sunucusu baslatiliyor...

cd server
if not exist node_modules (
    echo Ilk kurulum yapiliyor, kütüphaneler indiriliyor (sadece bir kere yapilir)...
    call npm install
)

echo.
node server.js
pause
