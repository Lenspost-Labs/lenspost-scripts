// image , tag , author , type

const fs = require('fs');
const sizeOf = require('image-size');
const { removeStopwords } = require('stopword');

const { uniqueNamesGenerator, adjectives, colors } = require('unique-names-generator');


const getAssetJSON = async () => {
    let data = await fs.readFileSync('suupp.json', 'utf8');
    data = JSON.parse(data)



    let assetJSON = data.map((item) => {
        let randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors] }); 
        let dimension = sizeOf(item)
        const asset = {
            image: item,
            tag: [],
            author : "supducks",
            type : "background",
            dimension : {
                width : dimension.width ,
                height : dimension.height
            }
        }
        return asset
    })

    console.log(assetJSON)

    fs.appendFileSync('asset-2.json', JSON.stringify(assetJSON), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });

    console.log(assetJSON)
}

getAssetJSON()