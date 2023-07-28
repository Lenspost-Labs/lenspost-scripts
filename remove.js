const fs = require('fs');

let file = fs.readFileSync('nouns.json', 'utf8');
file = JSON.parse(file);

for(let i = 0 ; i < file.length ; i++){
    file[i].ipfsLink = ""
}

fs.writeFileSync('nouns.json', JSON.stringify(file), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
});