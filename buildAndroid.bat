set NODE_OPTIONS=--max_old_space_size=10240
call npm install
call npm audit fix
call ionic cordova platform remove android
call ionic cordova platform add android
call npm run buildAndroidRelease
pause
