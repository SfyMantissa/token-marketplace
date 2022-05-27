import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import config from '../../config';

task("uriSatsuki",
  "Get the Satsuki token base64-encoded metadata for the given collection.")
  .addParam("tokenid", "ID of the Satsuki collection.")
  .setAction(async (args, { ethers }) => {
    const Satsuki = await ethers.getContractFactory("Satsuki");
    const satsuki = Satsuki.attach(config.SATSUKI_ADDRESS);
    const uri = await satsuki.uri(args.tokenid);
    console.log("Satsuki collection with ID " + args.tokenid
      + " has the following metadata:\n" + uri);
  });
