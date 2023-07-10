@REM @ECHO OFF

CD .\frontend
npm run build
CD ..

CD .\backend
.\venv\Scripts\activate
flask run