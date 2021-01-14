function Send-Internal-Email($res, $res2, $lineNumber)  {
#Send mail
	$body = "_____" + $lineNumber + "_____" + $OFS + $OFS + $OFS + "Below is the error generated :" + $OFS + $res2
	
	#create COM object named Outlook 
	$Outlook = New-Object -ComObject Outlook.Application 
	#create Outlook MailItem named Mail using CreateItem() method 
	$Mail = $Outlook.CreateItem(0) 
	#add properties as desired 
	$Mail.To = "gandary@path-solutions.com;ashreif@path-solutions.com;PEOmniChannel@path-solutions.com"
	#$Mail.To = "gandary@path-solutions.com" 
	$Mail.Cc = "PEOmniChannel@path-solutions.com"
	$Mail.Subject = "Error when generating build ("  + $version + ")"
	$Mail.Body = $body
	#send message 
	$Mail.Send() 
	[System.Runtime.Interopservices.Marshal]::ReleaseComObject($Outlook) | Out-Null
}

$lineNumber


function checkExitCode{
	if($?)
	{
	}
	else
	{
		$lineNumber = (Get-PSCallStack)[1].ScriptLineNumber
		Send-Internal-Email $_.Exception.Message $res $lineNumber
		exit
	}
}


function svnCleanUp()  {
	svn cleanup
	checkExitCode

	svn cleanup "."
	checkExitCode
}

if (Test-Path "mappingsLBSM8-FS1-2013v1.4.vbs")
{
cscript mappingsLBSM8-FS1-2013v1.4.vbs
}
svn update "version.txt"

$version = (Get-Content "version.txt")
$newVersion = [int]$version
$newVersion = $newVersion + 1
$shutdown = "N"

$version = "3.0.0.0." + $version
$sendEmailYN = "y"
$revert = "y"
$type = "2";
$FileName = "src/app/server-url.ts"
$webBuildLocation = "platforms/browser/www"
$tempWar = "tempWar"
$QCLocation = "G:\ashreif\omniIBK_WARS\" + $version
$pluginFolderLocation = "T:\Omni-Channel\DO NOT DELETE CONTENT\plugins"

$OFS = "`n"

$facebookAppID = ""
$MAIN_PATH = ""
$SERVER_URL = ""
$IBK_URL = ""
#export const APP_BUILD_DATE_TIME = '"+ (Get-Date).ToString('MM/dd/yyyy hh:mm:ss tt') +"'

$CONSTANT_CONSTANTS = "
export const APP_BUILD_DATE_TIME = ''
export const APP_VERSION = '3.0.0.0."+ $version	+"';
export const APP_NAME = '';
export const APP_INTERNAL_BUILD_VERSION = '';
export const FB_APP_ID = '';
export const PRODUCTION_MODE = APP_BUILD_DATE_TIME.length > 0;
export const clientCompCode = 1;
export const CLIENT_APP_BASE_HREF = '#';"

$facebookAppID = "export const facebookAppID = '235320874010074'; // QC - 235320874010074  --- Local 409697369840483"
$MAIN_PATH = "export const MAIN_PATH = 'https://fb-ebanking-qc-pm.path-solutions.com:8012/';// https://fb-ebanking.path-solutions.com/        https://fb-ebanking-qc-pm.path-solutions.com:8012/"
$SERVER_URL = "export const SERVER_URL = MAIN_PATH + 'omni_services_omnichannel_qc_o18/pathservices/';// omni_services/pathservices/   omni_services_omnichannel_qc_o18/pathservices/"
$IBK_URL = "export const IBK_URL = MAIN_PATH + 'omni_omnichannel_qc_o18/' + CLIENT_APP_BASE_HREF + '/menu';// www/   omni_omnichannel_qc_o18/"
$RECAPTCHA_KEY = "export const RECAPTCHA_KEY = '6LeWPp4UAAAAAA-NhQpCQoEyjJEYN8Xl0_GVYKbf';"
$RECAPTCHA_NATIVE_KEY = "export const RECAPTCHA_NATIVE_KEY = '6LfuPp4UAAAAAH4AFjobFnOKDEZceI85X3qzcP9q';"

if(Test-Path "plugins")
{
	Remove-Item -LiteralPath "plugins" -Force -Recurse
}
### ### ### Robocopy /S $pluginFolderLocation "plugins"

svnCleanUp

#svn Force update
if($revert -eq 'Y' -Or $revert -eq 'y')
{
	$res = svn revert -R "./"
	checkExitCode
}

svnCleanUp


#svn update
$res = svn update
checkExitCode


#invoke rebuild node-sass
$res = npm rebuild node-sass
checkExitCode

#invoke npm i
$res = npm i
checkExitCode

#add build platforms
$res = Ionic cordova platform add android
checkExitCode


$res = Ionic cordova platform add browser
checkExitCode


#create relative and correspondant server-url file
$ALL_CONTENT = $CONSTANT_CONSTANTS + $OFS + $facebookAppID + $OFS +  $MAIN_PATH + $OFS +  $SERVER_URL + $OFS + $IBK_URL + $OFS + $RECAPTCHA_KEY + $OFS +$RECAPTCHA_NATIVE_KEY 
### ### ### Clear-Content $FileName
### ### ### $ALL_CONTENT | Out-File $FileName -Encoding UTF8

#Change version
$content =  'content="' + $version + '"'
### ### ### (Get-Content "src/index.html") -replace 'content="3.0.0.*"', $content | Set-Content "src/index.html"
### ### ### (Get-Content "src/index.html") -replace 'content="3.0.0.*"', $content | Set-Content "platforms/browser/www/index.html"


#Build App
if ($type -eq '1')
{
	$res = npm run dev:build
	checkExitCode
}
elseIf ($type -eq '2') 
{
	$res = ionic cordova build android
	checkExitCode
}
elseIf ($type -eq '3') 
{

	$res = npm run dev:build
	checkExitCode

	$res = ionic cordova build android
	checkExitCode

}

#Create build folder for QC
if (Test-Path $QCLocation)
{

}
else
{
	mkdir $QCLocation
}

if ($type -eq '1' -Or $type -eq '3')
{
	if (Test-Path $tempWar)
	{
		Remove-Item -LiteralPath $tempWar -Force -Recurse
		
	}
	
	mkdir $tempWar
	cd $tempWar
	jar -xf  "../platforms/browser/www/omni_omnichannel_qc_o18.war"
	
	(Get-Content "cordova.js") -replace '/config.xml', "config.xml" -replace 'if.*4658021', "if(false){" | Set-Content "cordova.js"#Fix Cordova
	
	$QCWarLocation = $QCLocation + "\" + "omni.war"
	jar -cvf $QCWarLocation "."
	cd..
	Remove-Item -LiteralPath $tempWar -Force -Recurse
}

if ($type -eq '2' -Or $type -eq '3')
{
	copy "platforms\android\app\build\outputs\apk\debug\app-debug.apk" $QCLocation
}

Set-Content -Path "version.txt" -Value $newVersion -NoNewline

$msg = 'id:667487 Details:updated version to ' + $newVersion
$res = svn commit version.txt -m $msg
checkExitCode

#ii $QCLocation
#Send mail
$body = "Dear team," + $OFS +  "Kindly note that a new build has been generated under " + $QCLocation

#create COM object named Outlook 
$Outlook = New-Object -ComObject Outlook.Application 
#create Outlook MailItem named Mail using CreateItem() method 
$Mail = $Outlook.CreateItem(0) 
#add properties as desired 
$Mail.To = "MRomani@path-solutions.com;AGhaddar@path-solutions.com;PEQAeBanking@path-solutions.com"
#$Mail.To = "gandary@path-solutions.com" 
$Mail.Cc = "PEOmniChannel@path-solutions.com;PM-DigitalChannels@path-solutions.com"
$Mail.Subject = "MISC; New Build ("  + $version + ")"
$Mail.Body = $body
#send message 
$Mail.Send() 
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($Outlook) | Out-Null


if ($shutdown -eq 'Y' -Or $shutdown -eq 'y')
{
	Start-Sleep -Seconds 120
	Stop-Computer -Force
}

