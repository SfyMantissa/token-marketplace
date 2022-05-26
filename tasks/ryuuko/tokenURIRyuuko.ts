import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import config from '../../config';

task("tokenURIRyuuko",
  "Get the Ryuuko token base64-encoded metadata.")
  .addParam("tokenid", "ID of the Ryuuko NFT.")
  .setAction(async (args, { ethers }) => {
    const Ryuuko = await ethers.getContractFactory("Ryuuko");
    const ryuuko = Ryuuko.attach(config.RYUUKO_ADDRESS);
    const tokenURI = await ryuuko.tokenURI(args.tokenid);
    console.log("Ryuuko NFT with ID " + args.tokenid
      + " has the following metadata:\n" + tokenURI);
  });
