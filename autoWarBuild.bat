@echo OFF


set "$date=%date%___%time%"

set "$date=%$date:/=-%"
set "$date=%$date:.=-%"
set "$date=%$date::=-%"

set SRC_CODE=%cd%
set WAR_LOCATION=\\192.168.16.3\Shared\GilbertA\toQA\3.1\%$date%
set LOCAL_LOCATION=C:\Users\gilbertandary\Desktop\Wars\3.1\%$date%
set BUILD_TYPE_NUM=3

IF not exist %WAR_LOCATION% (mkdir %WAR_LOCATION%) || goto :error_handle
IF not exist %LOCAL_LOCATION% (mkdir %LOCAL_LOCATION%) || goto :error_handle


svn update || goto :error_handle

echo ----------------------------------------------------------------------------------------------------------------------
echo -------------------------------------------------Build WAR File-------------------------------------------------------
echo ----------------------------------------------------------------------------------------------------------------------

CALL buildWar.bat %SRC_CODE% , %WAR_LOCATION%, %LOCAL_LOCATION% , %BUILD_TYPE_NUM%

echo ----------------------------------------------------------------------------------------------------------------------
echo -------------------------------------------Build WAR Successfully Done------------------------------------------------
echo ----------------------------------------------------------------------------------------------------------------------

cd %cd%

powershell -command ".\emailNewBuild.ps1 'MISC;New 3.1 Build (%ran%)' 'Dear Team,\nPlease note a new build has been generated with version %ran%.'"

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
