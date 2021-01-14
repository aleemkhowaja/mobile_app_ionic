#!/bin/sh

#update submodules
#git submodule update --remote --merge

#remove www.zip
rm ./www/www.zip

#copy assets folder into www folder
cp -R ./assets/. ./www/assets/
#read the path version part from file (found under www) and combine it with assets version and update it in ps-config.json
node ./www/build-scripts/ps-custom-build.js
