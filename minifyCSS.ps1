#!/usr/bin/env pwsh

# arg0 is for the type of the minification:
# 1 - both
# 2- client
# 3- default

# arg1 is for a custom client css file name
# arg2 is for a custom default css file name

$basedir = Split-Path $MyInvocation.MyCommand.Definition -Parent
$basePATH = $basedir
$baseCommand = $basedir + "\minifyCSS\uglifycss\uglifycss \c \k "
$baseCommand = $basedir + "\minifyCSS\uglifycss\uglifycss.ps1 "
$MINIFIED_CSS_FILE_NAME = ""
$allCSSFilesArrayCommand = @()
$allCSSFilesArrayFullName = @()

function parseCSS($mainPath, $mainFile) {
    cd $mainPath
    $tempArrayCommands = @()
    #   $tempArrayFullName = @()
    foreach ($line in Get-Content $mainFile) {
        if ($line) {
            if ($line -match "import" -and !($line -match "/\*.*\*/")) {
                $line = $line.Replace("@import", "").Trim().Replace('"', "").Trim().Replace(";", "")
                Get-ChildItem  $line -Filter *.* | % {
                    if (test-path $_.FullName) {
                        $command = $baseCommand + "ugly-comments " + $_.FullName + " --output " + $_.BaseName + ".min.css"
                        $command = $baseCommand + "ugly-comments '" + $_.FullName + "'"
                        $tempArrayCommands += $command
                        #   $tempArrayFullName += $_.FullName
                        #   echo $command
                    }
                }
            }
        }
    }
    return $tempArrayCommands
}

function minifyCSS($tempAllCSSFilesArrayCommand, $tempAllCSSFilesArrayFullName) {
    for ($i = 0; $i -lt $tempAllCSSFilesArrayCommand.count; $i++) {
        echo "Minifying " $tempAllCSSFilesArrayCommand[$i]
        echo ''
        iex $tempAllCSSFilesArrayCommand[$i]  | out-file -Encoding ASCII -append $MINIFIED_CSS_FILE_NAME
    }
}


function minifyCSSProcess($configName, $propertyName, $minifyType) {
    $psConfig = cat $configName | ConvertFrom-Json 

    if ($psConfig) {
        if ($minifyType -eq 1) {
            echo "+++++++++++++++++++++ MINIFYING CLIENT ASSETS +++++++++++++++++++++"
            if (!$MINIFIED_CSS_FILE_NAME) {
                $MINIFIED_CSS_FILE_NAME = $psConfig | Select -expand MAIN_CONFIG | Select -expand $propertyName
            }
            $CLIENT_ASSETS_CONFIG = $psConfig | Select -expand CLIENT_ASSETS_CONFIG
        }
        else {
            echo "+++++++++++++++++++++ MINIFYING DEFAULT ASSETS +++++++++++++++++++++"
            $MINIFIED_CSS_FILE_NAME = $psConfig | Select -expand MAIN_CONFIG | Select -expand $propertyName
            $DEFAULT_ASSETS_CONFIG = $psConfig | Select -expand DEFAULT_ASSETS_CONFIG
        }
        
        
        if (!(test-path $MINIFIED_CSS_FILE_NAME)) {
            New-Item $MINIFIED_CSS_FILE_NAME
        }
        Clear-Content $MINIFIED_CSS_FILE_NAME
        

        if ($minifyType -eq 1) {
            $C_ASSETS_URL = $CLIENT_ASSETS_CONFIG | select -expand ASSETS_URL
            $C_ASSETS_URL = $basePATH + $C_ASSETS_URL

            $C_CSS_FOLDER_URL = $CLIENT_ASSETS_CONFIG | select -expand CSS_FOLDER_URL
            $C_CSS_FOLDER_URL = $C_ASSETS_URL + $C_CSS_FOLDER_URL

            $C_MAIN_CSS_FILE_NAME = $CLIENT_ASSETS_CONFIG | select -expand MAIN_CSS_FILE_NAME

            # $C_MAIN_PATH = $C_CSS_FOLDER_URL + $C_MAIN_CSS_FILE_NAME

            $allCSSFilesArrayCommand = parseCSS $C_CSS_FOLDER_URL $C_MAIN_CSS_FILE_NAME
        }
        else {
            $D_ASSETS_URL = $DEFAULT_ASSETS_CONFIG | select -expand ASSETS_URL
            $D_ASSETS_URL = $basePATH + $D_ASSETS_URL

            $D_CSS_FOLDER_URL = $DEFAULT_ASSETS_CONFIG | select -expand CSS_FOLDER_URL
            $D_CSS_FOLDER_URL = $D_ASSETS_URL + $D_CSS_FOLDER_URL

            $D_MAIN_CSS_FILE_NAME = $DEFAULT_ASSETS_CONFIG | select -expand MAIN_CSS_FILE_NAME

            # $D_MAIN_PATH = $D_CSS_FOLDER_URL + $D_MAIN_CSS_FILE_NAME

            $allCSSFilesArrayCommand = parseCSS $D_CSS_FOLDER_URL $D_MAIN_CSS_FILE_NAME
        }
    
        # echo $allCSSFilesArrayCommand
        cd  $basedir
        minifyCSS $allCSSFilesArrayCommand $allCSSFilesArrayFullName
    }
    
}

$releaseMode = {
    minifyCSSProcess "ps-config.json" "MINIFIED_CLIENT_CSS_FILE_NAME" 1
    minifyCSSProcess "ps-default-config.json" "MINIFIED_DEFAULT_CSS_FILE_NAME" 2
    exit
}

$devMode = {
    minifyCSSProcess "ps-config.json" "MINIFIED_CLIENT_CSS_FILE_NAME" 1
    minifyCSSProcess "ps-default-config.json" "MINIFIED_DEFAULT_CSS_FILE_NAME" 2
    exit
}

if ($args[0]) {
    
    if ($args[0] -eq 1) {
        $MINIFIED_CSS_FILE_NAME = $args[1]
        minifyCSSProcess "ps-config.json" "MINIFIED_CLIENT_CSS_FILE_NAME" 1
        $MINIFIED_CSS_FILE_NAME = $args[2]
        minifyCSSProcess "ps-default-config.json" "MINIFIED_DEFAULT_CSS_FILE_NAME" 2
    }
    
    if ($args[0] -eq 2) {
        $MINIFIED_CSS_FILE_NAME = $args[1]
        minifyCSSProcess "ps-config.json" "MINIFIED_CLIENT_CSS_FILE_NAME" 1
    }

    if ($args[0] -eq 3) {
        $MINIFIED_CSS_FILE_NAME = $args[2]
        minifyCSSProcess "ps-default-config.json" "MINIFIED_DEFAULT_CSS_FILE_NAME" 2
    }
}
else {
    &$releaseMode
}

