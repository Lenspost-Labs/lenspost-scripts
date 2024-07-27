const fs = require("fs");
const uploadImageToS3 = require("./uploadImageToS3");
const { convert, convertFile } = require("convert-svg-to-png");
const sharp = require("sharp");
let file = fs.readFileSync("./final.json", "utf-8");
file = JSON.parse(file);

const convertSvgBufferToPngBuffer = async (svgBuffer) => {
  const pngBuffer = await sharp(svgBuffer).png().toBuffer();
  const pngString = pngBuffer.toString("base64");
  fs.writeFileSync("./temp-1.txt", pngString);
  return pngBuffer;
};

const srcToS3 = async (src) => {
  for (let i = 0; i < file.length; i++) {
    let pages = file[i].data.pages;
    let ownerAddress = file[i].ownerAddress;

    if (!ownerAddress) {
      file[i] = null
      continue;
    }

    for (let j = 0; j < pages.length; j++) {
      let children = pages[j].children;

      for (let k = 0; k < children.length; k++) {
        let node = children[k];

        // console.log("node");

        if(!node.src) continue;
        if (node.src.startsWith("data:")) {
          console.log("data");
          let pngString;
          if (node.src.includes("image/svg+xml")) {
            console.log("canvas", file[i].id);
            console.log("svg");
            let svgString = node.src.split(",")[1];
            let svgBuffer = Buffer.from(svgString, "base64");
            let pngBuffer = await convertSvgBufferToPngBuffer(svgBuffer);
            pngString = pngBuffer.toString("base64");
          } else {
            pngString = node.src.split(",")[1];
          }

          let imageBuffer = Buffer.from(pngString, "base64");

          let key = `user/${ownerAddress}/canvas_assets/${file[i].id}/page_${j}/node_${k}.png`;
          let data = await uploadImageToS3(imageBuffer, key);
          file[i].data.pages[j].children[k].src = data;
        }
      }
    }
  }

  fs.writeFileSync("./canvases-2.json", JSON.stringify(file));
};

// srcToS3();

const finalJSON = () => {
  let finalJSON = [];
  for (let i = 0; i < file.length; i++) {
    if (file[i]) finalJSON.push(file[i]);
  }
  fs.writeFileSync("./final.json", JSON.stringify(finalJSON));
};

const count = () => {
  let count = 0;
  for (let i = 0; i < file.length; i++) {
    if (file[i]) count++; else console.log("null");
  }
  console.log(count);
}

count();

// finalJSON();