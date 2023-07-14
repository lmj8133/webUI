@ECHO OFF

@REM Check if python is installed
@python --version
@IF %ERRORLEVEL% NEQ 0 (
    ECHO "Python is not installed. Please install python and try again."
    EXIT /B 1
) ELSE (
    ECHO "Python is installed."
)

@REM Check if node is installed
@node --version
@IF %ERRORLEVEL% NEQ 0 (
    ECHO "Node is not installed. Please install node and try again."
    EXIT /B 1
) ELSE (
    ECHO "Node is installed."
)

ECHO "Building environment..."

REM python environment
CD .\backend
CALL venv.bat
CD ..

REM frontend environment
CD .\frontend
npm install
CD ..