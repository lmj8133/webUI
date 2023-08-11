@ECHO OFF

CALL "venv\Scripts\activate"
@pyinstaller -v
IF %ERRORLEVEL% NEQ 0 (
  pip install pyinstaller
)
pyinstaller --noconfirm --clean --icon="..\frontend\public\assets\icon.ico" --add-data=".\static;.\static" --add-data="..\frontend\dist;.\frontend" --additional-hooks-dir=".\hooks" server.py
CALL deactivate
