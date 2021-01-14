@echo OFF
setlocal EnableDelayedExpansion

:enter_upgrade_to
set UPGRADE_TO=""
echo Do you want to update the WWW module to latest version or a specific version?
echo (1:Latest Version; 2:Specific Version; 0:Exit)
set /p UPGRADE_TO="->"

if !UPGRADE_TO!==0 (
	echo You Chose to Exit!
	pause
	EXIT
) ELSE (	
	if !UPGRADE_TO!==1 (
		echo updating WWW module to latest version....
		git submodule update --remote || goto :error_handle
		goto :update_config
	) ELSE ( 

		if !UPGRADE_TO!==2 (
			for /f "tokens=1,2 delims=()" %%a in ('git submodule status') do ( 
				set sub_ver=%%b
			)
			echo Current WWW module HASH/TAG is: !sub_ver!
			git submodule update --remote --quiet
			cd www
			set VERSION_HASH=""
			echo List of last 10 versions of WWW:
			echo  HASH   		COMMENT
			echo ------- ----------------------------------------
			git --no-pager log --oneline -n 10 || goto :error_handle
			echo ------------------------------------------------
			git checkout !sub_ver! --quiet || goto :error_handle
			
			echo Please enter HASH code/Version TAG of the commit you want to update to 
			echo [obtained from the list above][0:Exit]
			set /p VERSION_HASH="->"
			
			if !VERSION_HASH!==0 (
				echo You Chose to Exit!
				pause
				EXIT
			)
			
			echo updating WWW module to version !VERSION_HASH!....
			git checkout !VERSION_HASH! || goto :error_handle
			cd ..
			goto :update_config
			
		) ELSE (
			echo Wrong Input entered!
			goto :enter_upgrade_to) ))

:update_config

xcopy ".\www\upgrade-scripts\config-files\*.*" ".\" /Y /R /q
echo WWW module is updated successfully to the specified version.
echo Please COMMIT the changes to repository before generating the build from Appflow.
goto :end_of_script


:error_handle
echo Upgrade Failed! Please check the above log. 

:end_of_script

pause
EXIT /B %ERRORLEVEL%