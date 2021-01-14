const fs = require('fs');
let fileReplacements = [{}];
try {
    const file = JSON.parse(fs.readFileSync('build-scripts/prebuild/fileReplacement.json'));
    fileReplacements = file.fileReplacements;
} catch (err) {
    console.error('preBuildScript - error while reading the fileReplacement.json');
    throw err;
}

if (fileReplacements && fileReplacements.length > 0) {
    for (let i = 0; i < fileReplacements.length; i++) {
        const curFile = fileReplacements[i];
        // File curFile.replace will be created or overwritten by curFile.with.
        fs.copyFile(curFile.with, curFile.replace, (err) => {
            if (err) throw err;
            console.log(curFile.with + ' was copied to ' + curFile.with);
        });
    }
}


