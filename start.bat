@echo off
rem Starts the Design Lab at http://localhost:4400 and opens it in the browser.
cd /d "%~dp0"
if not exist node_modules call pnpm install
call pnpm lab --open
