@echo off
setlocal
cd /d "%~dp0"
where py >nul 2>nul
if not errorlevel 1 (
  py -3 -c "import sys; raise SystemExit(sys.version_info < (3, 9))" >nul 2>nul
  if not errorlevel 1 goto :use_py
)
where python >nul 2>nul
if not errorlevel 1 (
  python -c "import sys; raise SystemExit(sys.version_info < (3, 9))" >nul 2>nul
  if not errorlevel 1 goto :use_python
)
echo Python 3.9 or newer was not found. Install it and try again.
echo The Python installer is available at https://www.python.org/downloads/windows/
set "exit_code=1"
goto :pause
:use_py
  py -3 server.py --open
  goto :done
:use_python
  python server.py --open
  goto :done
:done
set "exit_code=%errorlevel%"
if not "%exit_code%"=="0" echo The visual browser stopped with an error (exit %exit_code%).
:pause
echo.
pause
endlocal
