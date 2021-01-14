$assetsJsonObj = Get-Content -Path assets-version.json -Encoding utf8 -Raw | ConvertFrom-Json
$wwwJsonObj = Get-Content -Path ./www/upgrade-scripts/www-version.json -Encoding utf8 -Raw | ConvertFrom-Json
$assets = [int]$assetsJsonObj.VERSION
$appName = $assetsJsonObj.APP_NAME
$wwwVer = $wwwJsonObj.VERSION
$major,$minor,$extension,$store,$live = $wwwVer.split('.')


$ver = "{0:D2}" -f [int]$major + "{0:D2}" -f [int]$minor + "{0:D2}" -f [int]$extension + "{0:D2}" -f [int]$store + "{0:D4}" -f [int]$live + "{0:D4}" -f [int]$assets

cd ./www/upgrade-scripts
# call the reduced file generato based param1 = AppName, and param2 = Version
java -jar path_reduced_war_generation.jar $appName $ver
Move-Item -Path ./*.war -Destination ../../ -Force
pause