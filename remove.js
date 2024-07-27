const fs = require('fs');

let file = fs.readFileSync('lilnouns.json', 'utf8');
file = JSON.parse(file);

for(let i = 0 ; i < file.length ; i++){
    file[i].ipfsLink = ""
}

fs.writeFileSync('lilnouns.json', JSON.stringify(file), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
});

