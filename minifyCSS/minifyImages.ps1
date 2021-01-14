cls
Get-ChildItem -Path ./assets -Recurse -Directory -Force -ErrorAction SilentlyContinue | ForEach-Object {
    $direcrtory  = $_.FullName.replace("\","/");
	$direcrtoryListAll = $direcrtory + '/*'
    #echo "$direcrtory $direcrtory";
	$command =  "imagemin $direcrtoryListAll --out-dir=$direcrtory";
	echo $command
    Invoke-Expression $command
}