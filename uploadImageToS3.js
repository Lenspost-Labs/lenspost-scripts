const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');
dotenv.config();

const s3 = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
});

const uploadImageToR2 = async (file, key) => {
  const params = {
    Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
    Key: key, // File name you want to save as in R2
    Body: file,
    ContentType: "image/png",
  };

  try {
    const command = new PutObjectCommand(params);
    await s3.send(command);
    return `https://pub-5ef1b8f9642b4c209dac3dbddd02b1e0.r2.dev/${key}`;
  } catch (error) {
    console.error('Error uploading to R2:', error);
    throw error;
  }
};

module.exports = uploadImageToR2;