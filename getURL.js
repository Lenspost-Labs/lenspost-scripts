const aws = require('aws-sdk')
const dotenv = require('dotenv')
const fs = require('fs')

dotenv.config()
const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const getURL = async () => {


    // param to get files in specific folder
    const params = {
        Bucket: 'lenspost',
        Prefix: 'stickers/'
    }

    let data = await s3.listObjectsV2(params).promise();

    let s3url = data.Contents.map((item) => {
        const url = `https://lenspost.s3.amazonaws.com/${item.Key}`
        return url
    })

    fs.writeFile('s3-1url.json', JSON.stringify(s3url), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}

getURL().then((data) => {
    console.log(data)
})
