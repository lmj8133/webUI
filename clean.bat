@ECHO OFF

@REM sure to clean up the build directory?

SET param=%~1
SET cmd=%param%

IF "%cmd%" == "" GOTO NEXT
GOTO CHECK

:CHECK
IF "%cmd%" == "y" SET clean=1
IF "%cmd%" == "yes" SET clean=1
IF "%cmd%" == "Y" SET clean=1
IF "%cmd%" == "Yes" SET clean=1
IF "%cmd%" == "-y" SET clean=1
IF "%cmd%" == "-Y" SET clean=1
GOTO CLEAN

:NEXT
SET /p cmd="Are you sure you want to clean the build directory? [y/N] "
GOTO CHECK

:CLEAN
IF "%clean%" NEQ "1" GOTO END
@RD /Q /S backend\venv
@RD /Q /S backend\__pycache__
@DEL /Q /F backend\*.pyc
@RD /Q /S frontend\dist

:END
