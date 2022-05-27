import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import config from '../../config';

task("isApprovedForAllSatsuki",
  "Tells whether `operator` is the approved operator for `owner`.")
  .addParam("owner", "The NFTs owner's address.")
  .addParam("operator", "The supposed operator's address.")
  .setAction(async (args, { ethers }) => {
    const Satsuki = await ethers.getContractFactory("Satsuki");
    const satsuki = Satsuki.attach(config.SATSUKI_ADDRESS);
    const isApprovedForAll = await satsuki.isApprovedForAll(
      args.owner,
      args.operator
    );

    console.log(args.operator + " is approved operator for " + args.owner
      + " is " + isApprovedForAll + ".");
  }); 
