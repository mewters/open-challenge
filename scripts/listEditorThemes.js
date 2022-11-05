const themesFolder = `${__dirname}/../node_modules/monaco-themes/themes`;
const fs = require('fs');
let counter = 0;

fs.readdir(themesFolder, (err, files) => {
    files.forEach((file) => {
        if (file.endsWith('.json')) {
            console.log(file.replace('.json', ''));
            counter++;
        }
    });
    console.log('Total: ', counter);
});
