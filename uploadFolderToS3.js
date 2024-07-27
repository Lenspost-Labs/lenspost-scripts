const fs = require("fs");

const uploadImageToS3 = require("./uploadImageToS3");

const uploadFolderToS3 = async (folderName) => {
  const files = fs.readdirSync("phi");

  let addurl = [];

  for (let i = 0; i < files.length; i++) {
    let file = fs.readFileSync(`phi/${files[i]}`);

    let ext = files[i].split(".").pop();
    let fileName = `phi-${i}.${ext}`;

    // let res = await uploadImageToS3(file, `Stickers/kitty/${files[i]}`);
    let res = await uploadImageToS3(file, `Stickers/phi/${fileName}`);

    fs.writeFileSync(`phi/${fileName}`, file);

    addurl.push(res);
  }
  fs.writeFileSync(`phi.json`, JSON.stringify(addurl));
};

uploadFolderToS3("lens");
