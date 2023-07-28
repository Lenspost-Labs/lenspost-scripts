const axios = require("axios");
const sizeOf = require("image-size");
const fs = require("fs");

const downloadImage = async (path) => {
  let file = fs.readFileSync(path);
  let data = JSON.parse(file);

  for (let i = 0; i < data.length; i++) {
    let url = data[i].imageURL;

    let image = await axios.get(url, {
      responseType: "arraybuffer",
    });

    let dimensions = sizeOf(image.data);
    console.log(dimensions);
    image = Buffer.from(image.data, "binary").toString("base64");

    fs.writeFileSync(
      `./images/${data[i].title}.${dimensions.type}`,
      image,
      "base64"
    );

    console.log(`Downloading ${i} of ${data.length} images`);
  }
};

downloadImage("goblintown.wtf (2).json");
