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
  let data =  fs.readFileSync("phi.json", "utf8");
  data = JSON.parse(data);

  let assetJSON = data.map((item) => {
    let filepath = "phi/";
    let filename = item.split("/");
    filename = filename[filename.length - 1];

    console.log(filename);

    // filename = filename.replace(/[^a-zA-Z0-9]/g, "");
    filename = filename.replace(/%20/g, " ");
    filename = filename.replace(/%40/g, "@");

    console.log(filename);

    let tags = ["phi"];

    filepath = filepath + filename;
    let dimension = sizeOf(filepath);
    const asset = {
      image: item,
      tags: tags,
      author: "phi",
      type: "props",
      dimensions: [dimension.width, dimension.height],
      featured: true,
      wallet: "",
      campaign : "phi",
    };
    return asset;
  });

  fs.appendFileSync("phi_asset.json", JSON.stringify(assetJSON), (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });

  console.log(assetJSON);
};

getAssetJSON();
