@ECHO OFF

CD .\frontend
CALL frontend_build.bat
CD ..

CD .\backend
CALL backend_build.bat
CD ..

@MD .\dist
@XCOPY .\backend\dist\server .\dist /Y /E