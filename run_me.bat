@ECHO OFF

SET port=80
SET host="localhost"
SET nostart=0
SET cargs=""

GOTO ARGS
:ARGS
SET param=%~1
SET arg=%~2

IF "%param%" == "" GOTO END

SHIFT
IF "%param%" == "--host" (
    SET host=%arg%
    SHIFT
    GOTO ARGS
)
IF "%param%" == "--port" (
    SET port=%arg%
    SHIFT
    GOTO ARGS
)
IF "%param%" == "--nostart" (
    SET nostart=1
    GOTO ARGS
)
IF %cargs% == "" (
    SET cargs=%param%
) ELSE (
    SET cargs=%cargs% %param%
)
GOTO ARGS
:END

CD .\backend
CALL "venv\Scripts\activate"

IF %nostart% == 0 (
    START http://localhost:%port%
)

IF %cargs% == "" (
    sanic server.app --host=%host% --port=%port% --fast
) ELSE (
    sanic server.app --host=%host% --port=%port% --fast %cargs%
)

@REM Sanic will also perform fastest if you turn off access_log.
@REM If you still require access logs, but want to enjoy this performance boost, consider using Nginx as a proxy, and letting that handle your access logging.
@REM It will be much faster than anything Python can handle.
@REM https://sanic.dev/en/guide/deployment/nginx.html#introduction

@DEL /Q /F .\static\temp