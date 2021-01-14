@echo OFF
set apk_path=%cd%\platforms\android\app\build\outputs\apk\release\
set apk_name=app-release-unsigned
@call copy "%apk_path%\%apk_name%.apk" "%cd%\apks\%apk_name%_signed.apk"
@call "%JAVA_HOME%\bin\jarsigner.exe" -storetype pkcs12 -keystore "%cd%\sign-apk\SHA256withRSA_4096key_validTill_3017.p12" "%cd%\apks\%apk_name%_signed.apk" pathSolutionsAlias -storepass P@th1234
@call "%ANDROID_HOME%\build-tools\27.0.2\zipalign.exe" -f -v 4 "%cd%\apks\%apk_name%_signed.apk" "%cd%\apks\app-release-qc.apk"
del %cd%\apks\%apk_name%_signed.apk
@call pause

