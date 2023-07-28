// 1. download json from url and save it to local
// 2. read the json file
// 3. iterate json file and take the image url
// 4. download the image and save it to local
// 5. upload the image to s3
// 6. create a json file with the image url and other details
// 7. upload the json file to s3
//

const aws = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const sizeOf = require("image-size");
const dotenv = require("dotenv");
dotenv.config();

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const uploadFile = async (fileName) => {
  let res = await axios({
    method: "get",
    url: fileName,
  });

  fs.writeFileSync("data-2.json", JSON.stringify(res.data));

  let file = fs.readFileSync("data-2.json", "utf8");
  file = JSON.parse(file);

  let collectionName = file[0].name;

  for (let i = 1; i < file.length; i++) {
    console.log(file[i].imageURL);

    let imageBuffer = await axios({
      method: "get",
      url: file[i].imageURL,
      responseType: "arraybuffer",
    });

    console.log(imageBuffer.data);
    let dimension = sizeOf(imageBuffer.data);
    let type = dimension.type;
    console.log(type);

    let nftName = file[i].title;

    const params = {
      Bucket: "lenspost",
      Key: `collection/${collectionName}/${nftName}.${type}`,
      Body: imageBuffer.data,
      ContentType: `image/${type}`,
      ACL: "public-read",
    };

    let data = await s3.upload(params).promise();

    file[i].imageURL = data.Location;

    if (i % 100 == 0) {
      console.log(i);
    }
  }

  fs.writeFileSync("data-2.json", JSON.stringify(file), (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });

  let params = {
    Bucket: "lenspost",
    Key: `raw-json/${collectionName}/data.json`,
    Body: fs.readFileSync("data-2.json"),
    ContentType: "application/json",
    ACL: "public-read",
  };

  s3.upload(params, (err, data) => {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  });
};

uploadFile("https://lenspost.s3.ap-south-1.amazonaws.com/raw-json/data-2.json");
