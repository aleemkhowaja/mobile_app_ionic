@echo OFF

set BUILD_SRC_CODE=C:\omni\workspace\OMNI_CHANNELS_QC
set BUILD_SHARED_WAR_LOCATION=C:\Users\richardzourob\Desktop\wars
set BUILD_LOCAL_WAR_LOCATION=C:\Users\richardzourob\Desktop\wars
set COMMENT="Build Asof %date%:%time%" 
set NODE_OPTIONS=--max_old_space_size=10240

if "%~1"=="" ( set SRC_CODE=%BUILD_SRC_CODE%) ELSE (set SRC_CODE=%~1)
if "%~2"=="" ( set SHARED_WAR_LOCATION=%BUILD_SHARED_WAR_LOCATION%) ELSE (set SHARED_WAR_LOCATION=%~2)
if "%~3"=="" ( set LOCAL_WAR_LOCATION=%BUILD_LOCAL_WAR_LOCATION%) ELSE (set LOCAL_WAR_LOCATION=%~3)
if "%~4"=="" ( set BUILD_TYPE=  ) ELSE (set BUILD_TYPE=%~4)


:while
if "%~4"=="" (
	echo Build Process Start...-
	echo      1: omni_web_portal
	echo      2: omni_cust_web_portal
	echo      3: both
	set /p BUILD_TYPE=Which type of WAR would you like to generate?^
	
)

if %BUILD_TYPE%==0 (
	echo Process Stopped!
	pause
	EXIT
)

if %BUILD_TYPE%==1 (
	set BUILD_TYPE_STRING=omni_web_portal 
) ELSE (
if %BUILD_TYPE%==2 ( 
	set BUILD_TYPE_STRING=omni_cust_web_portal
)  ELSE (
if %BUILD_TYPE%==3 ( 
	set BUILD_TYPE_STRING=omni_web_portal 
) ELSE (
	echo Wrong Input entered, Please enter the below options^
	goto :while)))


echo Building %BUILD_TYPE_STRING% WAR file....
CALL :buildProcessByType %BUILD_TYPE% , %BUILD_TYPE_STRING%

cd %SRC_CODE%
if %BUILD_TYPE%==3 ( 
	echo -------------------------------------------Deleting %SRC_CODE%\www\------------------------------------------------
	rmdir /s /q %SRC_CODE%\www\ || goto :error_handle
)
if %BUILD_TYPE%==3 CALL :buildProcessByType %BUILD_TYPE% , omni_cust_web_portal

if "%~1"=="" ( pause )

EXIT /B %ERRORLEVEL%
:buildProcessByType
set CUST_CONFIGURATION= 
if %~2==omni_cust_web_portal set CUST_CONFIGURATION=-c=customization

powershell -command ".\minifyCSS.ps1 ./assets/ps-css-files.war.min.css"

if %~2==omni_cust_web_portal ( 
	call npm run custbuildWar || goto :error_handle
) ELSE (call ionic build --prod --release --aot --minifyjs --minifycss -- --base-href ./ || goto :error_handle)

rem call ionic build %CUST_CONFIGURATION% --prod --release --aot --minifyjs --minifycss -- --base-href ./ || goto :error_handle

rem build the client minified css file
powershell -command "%SRC_CODE%\minifyCSS.ps1 2 ./assets/ps-css-files.war.min.css" || goto :error_handle

rem copy client assets to local location
xcopy "%SRC_CODE%\www\assets" "%LOCAL_WAR_LOCATION%\assets" /EXCLUDE:exclude_assets_copy.txt /E /Y /R /q /i /s
xcopy "%SRC_CODE%\assets\ps-css-files.war.min.css" "%LOCAL_WAR_LOCATION%\assets" /Y /R /q

echo -------------------------------------------Deleting %SRC_CODE%\www\assets\--------------------------------------------
rmdir /s /q %SRC_CODE%\www\assets\ || goto :error_handle

cd www

rem copy the default_theme as the only assets folder in www
xcopy "%SRC_CODE%\assets\branding\default_theme" "%SRC_CODE%\www\assets\branding\default_theme" /E /Y /R /q /i /s

rem minify the default_theme css and remove the related css files
powershell -command "%SRC_CODE%\minifyCSS.ps1 3" || goto :error_handle
xcopy "%SRC_CODE%\assets\ps-css-default-files.min.css" "%SRC_CODE%\www\assets" /Y /R /q
rmdir /s /q %SRC_CODE%\www\assets\branding\default_theme\css
if %~2==omni_cust_web_portal xcopy "%SRC_CODE%\assets\branding\default_theme\css\ps-customization-ui.css" "%SRC_CODE%\www\assets\branding\default_theme\css\ps-customization-ui.css*" /S /Q /Y /F

jar -cvf "%~2.war" * || goto :error_handle
xcopy "%SRC_CODE%\www\%~2.war" "%LOCAL_WAR_LOCATION%" /Y /R /i
xcopy "%SRC_CODE%\www\%~2.war" "%SHARED_WAR_LOCATION%" /Y /R /i
xcopy "%LOCAL_WAR_LOCATION%\assets" "%SHARED_WAR_LOCATION%\assets" /E /Y /R /q /i /s

echo ----------------------------------------------------------------------------------------------------------------------
echo -------------------------------------------Build %~2.war Successfully Done--------------------------------------------
echo ----------------------------------------------------------------------------------------------------------------------



EXIT /B 0


:error_handle
echo ---------------------------------Build Failed--------------------------------------- 
echo ---------------------------Please check the above log------------------------------- 
pause
Exit