const AWS = require("aws-sdk");
const dotenv = require("dotenv");
dotenv.config();

// Configure the AWS SDK to use your R2 endpoint
const s3 = new AWS.S3({
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
  secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  region: "auto",
});

const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME;
const oldPrefix = "Stickers/ham/";
const newPrefix = "Stickers/ham/";

async function renameDirectory() {
  try {
    // List all objects with the old prefix
    const listParams = {
      Bucket: bucketName,
      Prefix: oldPrefix,
    };

    // const listedObjects = await s3.listObjectsV2(listParams).promise();

    const obj_names = [
      "Ham_Sticker_00",
    ];
    // Copy each object to the new prefix
    for (const object of obj_names) {
      console.log(`${bucketName}/Stickers/ham/${object}`);
      const copyParams = {
        Bucket: bucketName,
        CopySource: `${bucketName}/Stickers/ham/${object}.png`,
        Key: `Stickers/ham/${object.replace("Ham_Sticker_00", "Ham")}.png`,
      };

      await s3.copyObject(copyParams).promise();
      console.log(`Copied ${object.Key} to ${copyParams.Key}`);
    }

    console.log("Directory renamed successfully");
  } catch (error) {
    console.error("Error renaming directory:", error);
  }
}

renameDirectory();
