REM Check if python is installed
@python --version
IF %ERRORLEVEL% NEQ 0 (
    ECHO "Python is not installed. Please install python and try again."
    EXIT /B 1
) ELSE (
    ECHO "Python is installed."
)

REM Check if npm is installed
@npm --version
IF %ERRORLEVEL% NEQ 0 (
    ECHO "npm is not installed. Please install npm and try again."
    EXIT /B 1
) ELSE (
    ECHO "npm is installed."
)

ECHO "Building environment..."

REM python environment
CD .\backend
CALL venv.bat
CD ..

REM frontend environment
CD .\frontend
npm install
npm run build
CD ..