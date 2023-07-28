const { Alchemy, Network } = require("alchemy-sdk");
const fs = require("fs");
require("dotenv").config();

const config = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(config);

/**
 * A function to get all the NFTs for a given contract address and save it to a JSON file
 *
 * @param {*} contractAddress Contract Address of the NFT Collection
 * @param {*} collectionName Name of the NFT Collection
 * @param {*} pageKey Pagination Key , default sets to null
 */
async function getNFTsforContract(contractAddress, collectionName, pageKey) {
  console.log("before", pageKey);
  let nfts = await alchemy.nft.getNftsForContract(
    contractAddress,
    (options = {
      pageKey: pageKey,
    })
  );
  let pagination = nfts["pageKey"];
  console.log("after", pagination);
  nfts = nfts["nfts"];
  collectionData = [];
  for (let i = 0; i < nfts.length; i++) {
    // console.log(nfts[i]);
    // return;
    try{
    collectionData.push({
      tokenId: nfts[i].tokenId,
      title: nfts[i].title,
      description: nfts[i].description,
      ipfsLink: nfts[i]["rawMetadata"]["image"],
      edition: nfts[i]["rawMetadata"]["edition"],
      imageURL : nfts[i]["media"][0]["gateway"],
      openSeaLink:
        "https://opensea.io/assets/ethereum/" +
        contractAddress +
        "/" +
        nfts[i].tokenId,
    });
  } catch (err) {
    console.log(err);
    console.log(nfts[i]);
  }
    // console.log(collectionData);
  }
  jsonData = JSON.stringify(collectionData);
  fs.appendFile(`${collectionName}.json`, jsonData, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
  if (pagination != null) {
    getNFTsforContract(
      (contractAddress = contractAddress),
      `${collectionName}`,
      (pageKey = pagination)
    );
  }
}

getNFTsforContract(
  "0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03",
  "nouns",
  null
);

