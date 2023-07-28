const { Alchemy, Network } = require("alchemy-sdk");
const fs = require("fs");
require("dotenv").config();

const config = {
    apiKey: process.env.ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(config);

const main = async () => {
    // define the address whose contract metadata you want to fetch
    const address = "0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270";

    //Call the method to fetch metadata
    const response = await alchemy.nft.getContractMetadata(address)

    //Logging the response to the console
    console.log(response)
}

main();