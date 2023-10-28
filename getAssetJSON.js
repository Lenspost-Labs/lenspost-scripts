// image , tag , author , type

const fs = require("fs");
const sizeOf = require("image-size");
const { removeStopwords } = require("stopword");

const {
  uniqueNamesGenerator,
  adjectives,
  colors,
} = require("unique-names-generator");

const getAssetJSON = async () => {
  let data = await fs.readFileSync("lens-1-url.json", "utf8");
  data = JSON.parse(data);

  let assetJSON = data.map((item) => {
    let filepath = "lens - set - 1/";
    let filename = item.split("/");
    filename = filename[filename.length - 1];
    console.log(filepath);
    console.log(filename);

    let tags = ["lens"]

    // tags = filename.split(".")[0].split("=");
    // let tag1 = tags[1].split("-");
    // tags.pop();
    // tags = tags.concat(tag1);

    // filename = filename.replace(/%20/, " ")
    // while(filename.includes("%20")){
    //     filename = filename.replace("%20", " ");
    //  }
    filepath = filepath + filename;
    let dimension = sizeOf(filepath);
    const asset = {
      image: item,
      tags: tags,
      author: "lens",
      type: "props",
      feature: true,
      dimensions: [dimension.width, dimension.height],
    };
    return asset;
  });

  fs.appendFileSync("lens-asset-1.json", JSON.stringify(assetJSON), (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });

  console.log(assetJSON);
};

getAssetJSON();
