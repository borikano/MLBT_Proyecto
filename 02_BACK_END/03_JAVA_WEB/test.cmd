@echo off
setlocal
set "REPO_ROOT=%~dp0..\.."
cd /d "%REPO_ROOT%"
"%REPO_ROOT%\02_BACK_END\02_SPRING_WEB\mvnw.cmd" -f "%REPO_ROOT%\02_BACK_END\03_JAVA_WEB\pom.xml" test %*
exit /b %ERRORLEVEL%
