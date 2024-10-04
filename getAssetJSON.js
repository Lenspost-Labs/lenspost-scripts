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
  let data =  fs.readFileSync("moxi.json", "utf8");
  data = JSON.parse(data);

  let assetJSON = data.map((item) => {
    let filepath = "moxi/";
    let filename = item.split("/");
    filename = filename[filename.length - 1];

    console.log(filename);

    // filename = filename.replace(/[^a-zA-Z0-9]/g, "");
    filename = filename.replace(/%20/g, " ");
    filename = filename.replace(/%40/g, "@");

    console.log(filename);

    let tags = ["moxie", "moxi"];

    filepath = filepath + filename;
    let dimension = sizeOf(filepath);
    const asset = {
      image: item,
      tags: tags,
      author: "moxie",
      type: "props",
      feature: true,
      dimensions: [dimension.width, dimension.height],
      featured: true,
      wallet: "",
      campaign : "moxie",
    };
    return asset;
  });

  fs.appendFileSync("moxie_asset.json", JSON.stringify(assetJSON), (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });

  console.log(assetJSON);
};

getAssetJSON();
