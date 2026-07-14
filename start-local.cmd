@echo off
cd /d "%~dp0"
start "LALA local server" /B node local-server.mjs
timeout /t 1 /nobreak >nul
start "" http://127.0.0.1:43992/
