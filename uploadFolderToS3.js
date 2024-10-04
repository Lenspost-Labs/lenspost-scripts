const fs = require("fs");

const uploadImageToS3 = require("./uploadImageToS3");

const uploadFolderToS3 = async (folderName) => {
  const files = fs.readdirSync(folderName);

  let addurl = [];

  for (let i = 0; i < files.length; i++) {
    let file = fs.readFileSync(`${folderName}/${files[i]}`);

    let ext = files[i].split(".").pop();
    let fileName = `${folderName}-${i}.${ext}`;

    let res = await uploadImageToS3(file, `Stickers/${folderName}/${fileName}`);
    if (files.length % 10 == 0) {
      console.log(files.length);
    }

    fs.writeFileSync(`${folderName}/${fileName}`, file);

    addurl.push(res);
  }
  fs.writeFileSync(`${folderName}.json`, JSON.stringify(addurl));
};

uploadFolderToS3("ham");
