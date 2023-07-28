const fs = require("fs");

const uploadImageToS3 = require("./uploadImageToS3");
const { constrainedMemory } = require("process");

const uploadFolderToS3 = async (folderName) => {
  const files = fs.readdirSync("lens - set - 1");

  //   let urlfile = fs.readFileSync(`url.json`);
  //   let url = JSON.parse(urlfile);
  //   let keys = Object.keys(url);
  //   let lastKey = Number(keys[keys.length - 1]);

  lastKey = 0;

  let addurl = [];

  for (let i = 0; i < files.length; i++) {
    console.log(files[i]);

    let file = fs.readFileSync(`lens - set - 1/${files[i]}`);

    console.log(file);

    let res = await uploadImageToS3(
      file,
      `Stickers/1/props/${files[i]}`
    );

    addurl.push(res);
  }
  fs.writeFileSync(`lens-1-url.json`, JSON.stringify(addurl));
  console.log(addurl);
};

uploadFolderToS3("Supepes Accessories");
