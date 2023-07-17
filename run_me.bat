@ECHO OFF

SET port=80
SET host="localhost"
SET nostart=0

GOTO ARGS
:ARGS
SET param=%~1
SET arg=%~2

IF "%param%" == "" GOTO END

SHIFT
IF "%param%" == "--host" (
    SET host=%arg%
    SHIFT
)
IF "%param%" == "--port" (
    SET port=%arg%
    SHIFT
)
IF "%param%" == "--nostart" (
    SET nostart=1
)
GOTO ARGS
:END

CD .\backend
CALL "venv\Scripts\activate"

IF %nostart% == 0 (
    START http://localhost:%port%
)
python -m flask run --host=%host% --port=%port%

@DEL /Q /F .\app\static\temp