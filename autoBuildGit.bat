@set @e=0 /*

@echo OFF

set "$date=%date%___%time%"

set "$date=%$date:/=-%"
set "$date=%$date:.=-%"
set "$date=%$date::=-%"
set "$date=%$date: =%"



set OMNIBK_WWW=D:\OMNIBK\GitHub\OMNIBK_WWW
set OMNIBK_PRESALES=D:\OMNIBK\GitHub\OMNIBK_PRESALES
set OMNIBK_PATH=D:\OMNIBK\GitHub\OMNIBK_PATH_JAIZ
set SRC_CODE=%cd%
set WAR_LOCATION=\\192.168.16.3\Shared\GilbertA\toQA\Latest\%$date%
set LOCAL_LOCATION=C:\Users\gilbertandary\Desktop\Wars\Latest\%$date%

set wwwLoc="%SRC_CODE%/build-scripts/upgrade-scripts/www-version.json"
set assetsLoc="%OMNIBK_PATH%/assets-version.json"
set @e=
for /F "delims=" %%L in ('
  cscript //nologo //e:jscript "%~f0" %wwwLoc% %assetsLoc%
') do set "ran=%%L"

set COMMENT="Build Ver %ran% Asof %date%:%time%"
set BUILD_TYPE_NUM=3
SET buildVersion=%ran:.=%

set /p SEND_EMAIL=Do You want to send automatic mail? (y for YES, any other character for NO)

IF not exist %WAR_LOCATION% (mkdir %WAR_LOCATION%) || goto :error_handle
IF not exist %LOCAL_LOCATION% (mkdir %LOCAL_LOCATION%) || goto :error_handle

echo Generating Build %ran%


echo pull the git repos

echo ----------------------------------------------------------------------------------------------------------------------
echo ---------------------------------------------Pulling %OMNIBK_WWW%-----------------------------------------------------
echo ----------------------------------------------------------------------------------------------------------------------
cd %OMNIBK_WWW%
git pull  || goto :error_handle

echo ----------------------------------------------------------------------------------------------------------------------
echo ---------------------------------------------Pulling %OMNIBK_PATH%----------------------------------------------------
echo ----------------------------------------------------------------------------------------------------------------------
cd %OMNIBK_PATH%
git pull  || goto :error_handle

rem echo pulling OMNIBK_PRESALES...
rem cd %OMNIBK_PRESALES%
rem git pull

echo ----------------------------------------------------------------------------------------------------------------------
echo --------------------------------------------------SVN update----------------------------------------------------------
echo ----------------------------------------------------------------------------------------------------------------------
cd %SRC_CODE%
svn update || goto :error_handle

echo ----------------------------------------------------------------------------------------------------------------------
echo ---------------------------------------------Build Mobile Started-----------------------------------------------------
echo ----------------------------------------------------------------------------------------------------------------------
echo -----------------------------%COMMENT%-------------------------------------
set NODE_OPTIONS=--max_old_space_size=10240
call npm install  || goto :error_handle
rem call npm audit fix || goto :error_handle

echo Building Mobile Packages...
rem call ionic cordova platform remove android
rem call ionic cordova platform add android --no-resources
call ionic build --prod  --release --aot --minifyjs --minifycss || goto :error_handle
cd %cd%

echo ----------------------------------------Delete assets from %OMNIBK_PATH%----------------------------------------------
REM rmdir /s /q %OMNIBK_PRESALES%\assets\
rmdir /s /q %OMNIBK_PATH%\assets\

echo ----------------------------------------Delete www.zip from %OMNIBK_WWW%----------------------------------------------
del /q %OMNIBK_WWW%\www.zip
rem del /q %OMNIBK_WWW%\*
rem for /D %%d in (%OMNIBK_WWW%\*) do if "%%d" neq ".git" rmdir /s /q "%%d"

rem xcopy "%SRC_CODE%\www\assets" "%OMNIBK_PRESALES%\assets" /E /Y /R /q /i /s
xcopy "%SRC_CODE%\www\assets" "%OMNIBK_PATH%\assets" /EXCLUDE:exclude_assets_copy.txt /E /Y /R /q /i /s

rem remove full assets folder & ps-config.json from www
rmdir /s /q %SRC_CODE%\www\assets\
del /q %SRC_CODE%\www\ps-config.json

rem copy the default_theme as the only assets folder in www
xcopy "%SRC_CODE%\assets\branding\default_theme" "%SRC_CODE%\www\assets\branding\default_theme" /E /Y /R /q /i /s
rem minify the default_theme css and remove the related css files
powershell -command "%SRC_CODE%\minifyCSS.ps1 3"
xcopy "%SRC_CODE%\assets\ps-css-default-files.min.css" "%SRC_CODE%\www\assets" /Y /R /q
rmdir /s /q %SRC_CODE%\www\assets\branding\default_theme\css

echo ----------------------------------------------Creating www.zip--------------------------------------------------------
cd %SRC_CODE%\www
zip -r www.zip -P Z!p4P@thENv12345 . || goto :error_handle

echo ------------------------------Copy zip file and upgrade-scripts to %OMNIBK_WWW%---------------------------------------
xcopy "%SRC_CODE%\www\www.zip" "%OMNIBK_WWW%" /Y /R /q
xcopy "%SRC_CODE%\www\www.zip" "%LOCAL_LOCATION%" /Y /R /q
xcopy "%SRC_CODE%\build-scripts\upgrade-scripts" "%OMNIBK_WWW%\upgrade-scripts" /E /Y /R /q /i /s


echo ----------------------------------------------pushing %OMNIBK_WWW%----------------------------------------------------
cd %OMNIBK_WWW%
CALL :git_push %COMMENT% || goto :error_handle



cd %OMNIBK_PATH%
echo updating submodule to latest www commit....
git submodule update --remote --merge || goto :error_handle
xcopy ".\www\upgrade-scripts\config-files\*.*" ".\" /Y /R /q

echo ----------------------------------------------pushing %OMNIBK_PATH%---------------------------------------------------
CALL :git_push %COMMENT% || goto :error_handle

REM echo pushing OMNIBK_PRESALES...
REM cd %OMNIBK_PRESALES%
REM CALL :git_push %COMMENT%
echo ----------------------------------------------------------------------------------------------------------------------
echo -----------------------------------------Build Mobile Successfully Done-----------------------------------------------
echo ----------------------------------------------------------------------------------------------------------------------

echo ----------------------------------------------------------------------------------------------------------------------
echo -------------------------------------------------Build WAR File-------------------------------------------------------
echo ----------------------------------------------------------------------------------------------------------------------

cd %SRC_CODE%

CALL .\buildWar.bat %SRC_CODE% , %WAR_LOCATION%, %LOCAL_LOCATION% , %BUILD_TYPE_NUM%

echo ----------------------------------------------------------------------------------------------------------------------
echo -------------------------------------------Build WAR Successfully Done------------------------------------------------
echo ----------------------------------------------------------------------------------------------------------------------

cd %SRC_CODE%

if "%SEND_EMAIL%"=="Y" set SEND_EMAIL=y

if "%SEND_EMAIL%"=="y" (
	powershell -command ".\emailNewBuild.ps1 'MISC;New Build (%ran%)' 'Dear Team,\nPlease note a new build has been generated under %WAR_LOCATION% with version %ran%.'"
)

pause
EXIT

 
:git_push
git add .
git commit -m "%~1"
git push
EXIT /B 0

:error_handle
echo ---------------------------------Build Failed--------------------------------------- 
echo ---------------------------Please check the above log------------------------------- 
pause
Exit
*/


function readJsonFile(fileName){
	var htmlfile = WSH.CreateObject('htmlfile');
	htmlfile.write('<meta http-equiv="x-ua-compatible" content="IE=9" />');
	var JSON = htmlfile.parentWindow.JSON;
	FSOObj = new ActiveXObject("Scripting.FileSystemObject");
	var txtFile=FSOObj.OpenTextFile(fileName,1);
	var json=txtFile.ReadAll();
	var jParsed;
	try {
		jParsed=JSON.parse(json);
	} catch(err) {
	   WScript.Echo("Failed to parse the json content");
	   htmlfile.close();
	   txtFile.close();
	   WScript.Echo(err.message);
	   WScript.Exit(1);
	   
	}
	
	htmlfile.close();
	txtFile.close();
	return jParsed;
}

function getVersion(wwwLoc, assetsLoc) {

	var wwwVer = readJsonFile(wwwLoc);
	var assetsVer = readJsonFile(assetsLoc);
	var version = wwwVer.VERSION + "." + assetsVer.VERSION;
	return version;
}

var param1=WScript.Arguments(0);
var param2=WScript.Arguments(1);


WScript.Echo(getVersion(param1,param2));