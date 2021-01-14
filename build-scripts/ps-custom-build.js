'use strict';

const fs = require('fs-extra');
var et = require('elementtree');
const { exec } = require("child_process");
var clientCssFolderUrl = '';
var clientMinCssName = '';

function processCssFile(cssFile, cssFolder) {
	const baseCommand = "chmod u+r+x ./www/build-scripts/minifyCSS/uglifycss/uglifycss && ./www/build-scripts/minifyCSS/uglifycss/uglifycss ";
	var tempArrayCommands = [];
	var commentRegex = /(\/\*(.|\s)*?\*\/|(\n|\t|\r|\v|\f){1,}|\s(?=\s)|(?<=})\s|(?<={)\s|\s(?={)|\s(?=})|(?<=;)\s|[[:blank:]](?=;)|(?<=:)[[:blank:]]|(?<=,)[[:blank:]])/g;
	// remove all comments and empty spaces from the file
	var noCommentCssFile = cssFile.replace(commentRegex, '');
	// split the import commands  
	var importsList = noCommentCssFile.split('@import');
	if (importsList && importsList.length > 0) {
		for (var j = 0; j < importsList.length; j++) {
			var fileName = importsList[j];
			if (fileName) {
				fileName = cssFolder + fileName.trim().replace('"./', '').trim().replace('";', '');
				var commandObj = {
					cmd: baseCommand + "ugly-comments '" + fileName + "'",
					fileName
				};
				tempArrayCommands.push(commandObj);
			}
		}
	}
	return tempArrayCommands;

}

function execMinifyCmd(minifyCssCmdList, minCssFile) {
	var curFile = minifyCssCmdList.shift();
	// call the minify command
	exec(curFile.cmd, (error, stdout, stderr) => {
		if (error) {
			console.log('error: ${error.message}');
			throw error;
		}
		if (stderr) {
			console.log('stderr: ${stderr}');
			throw stderr;
		}
		minCssFile += stdout;
		if (minifyCssCmdList.length == 0 && minCssFile !== '') {
			fs.writeFileSync(clientMinCssName, minCssFile, 'utf-8');
			fs.removeSync(clientCssFolderUrl);
		} else {
			execMinifyCmd(minifyCssCmdList, minCssFile);
		}
	});
}

//get the www version
fs.readFile('www/build-scripts/www-version.json', (err, data1) => {
	if (err) throw err;
	let wwwVer = JSON.parse(data1);
	//get the assets version
	fs.readFile('assets-version.json', (err, data2) => {
		if (err) throw err;
		let assetsVer = JSON.parse(data2);
		const newVer = wwwVer.VERSION + "." + assetsVer.VERSION;
		var regex = new RegExp('^[0-9]+.[0-9]+.[0-9]+.[0-9]+.[0-9]+.[0-9]+$');
		if (!regex.test(newVer)) {
			// If the version is not valid, throw an error.
			throw new Error('Please provide a valid version number. Provided Version is ' + newVer);
		}
		//read the ps-config.json and adjust the version and rewrite it
		fs.readFile('ps-config.json', (err, data3) => {
			if (err) throw err;
			let psConfig = JSON.parse(data3);
			psConfig.MAIN_CONFIG.APP_VERSION = newVer;
			let newData = JSON.stringify(psConfig);
			fs.writeFileSync('./www/ps-config.json', newData, (err) => {
				if (err) throw err;
				console.log("successfully updated version in ps-config.json to " + newVer);
			});

			//get the minified css file name and call the minify script
			clientMinCssName = './www' + psConfig.MAIN_CONFIG.MINIFIED_CLIENT_CSS_FILE_NAME;
			var clientAssetsUrl = './www' + psConfig.CLIENT_ASSETS_CONFIG.ASSETS_URL;
			clientCssFolderUrl = clientAssetsUrl + psConfig.CLIENT_ASSETS_CONFIG.CSS_FOLDER_URL;
			var clientMainCssFileName = clientCssFolderUrl + psConfig.CLIENT_ASSETS_CONFIG.MAIN_CSS_FILE_NAME;
			//read the config.xml and adjust the version and rewrite it
			var clientMainCssFile = fs.readFileSync(clientMainCssFileName, 'utf-8');
			if (clientMainCssFile) {
				var minifyCssCmdList = processCssFile(clientMainCssFile, clientCssFolderUrl);
				if (minifyCssCmdList && minifyCssCmdList.length > 0) {
					var minCssFile = '';
					execMinifyCmd(minifyCssCmdList, minCssFile);
				}
			}
		});

		//read the config.xml and adjust the version and rewrite it
		var data4 = fs.readFileSync('config.xml', 'utf-8');

		if (data4) {
			// Windows is the BOM. Skip the Byte Order Mark.
			data4 = data4.substring(data4.indexOf('<'));
		}

		var doc = new et.ElementTree(et.XML(data4));		// eslint-disable-line babel/new-cap
		var root = doc.getroot();

		if (root.tag !== 'widget') {
			// Throw an error if widget is not the root tag
			throw new Error('config.xml has incorrect root node name (expected "widget", was "' + root.tag + '")');
		}

		// Set the version of the widget tag
		root.attrib.version = newVer;
		fs.writeFileSync("config.xml", doc.write({ indent: 4 }), 'utf-8');

	});
});

