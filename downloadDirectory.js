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

let data = ["cryptodickbutt" , "cryptotoadz" , "goblintown.wtf" , "gods-hates-nftees" , "mfers" , "moonrunners" , "nouns" , "participants" , "rektguy" , "synthetic anons" , "tubby cats" , "wgmis"];

const downloadData = async () => {

    for(let i = 0 ; i < data.length ; i++){

    let url =  `https://lenspost.s3.ap-south-1.amazonaws.com/raw-json/${data[i]}/data.json`;

    let response = await axios.get(url);

    let dataa = response.data;

    // save json file

    fs.writeFileSync(`./data/${data[i]}.json`, JSON.stringify(dataa));

    }
};

downloadData();
