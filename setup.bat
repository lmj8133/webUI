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