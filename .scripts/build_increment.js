/* 
    Auto Increment Patch Version in the package.json
    2020-05-11 Ali Lishan
*/

console.log('\n --- Increment Version: ');
console.log('* Reading Package JSON');

// Read package.json
const fs = require('fs');
const file = 'package.json';
const content = fs.readFileSync(file);
const appJson = JSON.parse(content);

console.log(`* Current Version: ${appJson.version}`);
let version = appJson.version.trim().split('.');

// Increment New Patch Version
let newVersion = parseInt(version[2]) + 1;
    newVersion = `${version[0]}.${version[1]}.${newVersion}`;

// Assign New Version
appJson.version = newVersion;
appJson.build = `build-${new Date().getTime()}`;    

console.log(`* New Version: ${appJson.version}`);

// Write back to package.json
console.log('* Writting to file ...')
fs.writeFile(file, JSON.stringify(appJson, null, 4), (error) => {
    if(error) throw error;
    console.log(' --- Done! \n')
})
