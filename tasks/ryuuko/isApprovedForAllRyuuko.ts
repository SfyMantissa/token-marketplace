import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import config from '../../config';

task("isApprovedForAllRyuuko",
  "Tells whether `operator` is the approved operator for `owner`.")
  .addParam("owner", "The NFTs owner's address.")
  .addParam("operator", "The supposed operator's address.")
  .setAction(async (args, { ethers }) => {
    const Ryuuko = await ethers.getContractFactory("Ryuuko");
    const ryuuko = Ryuuko.attach(config.RYUUKO_ADDRESS);
    const isApprovedForAll = await ryuuko.isApprovedForAll(
      args.owner,
      args.operator
    );

    console.log(args.operator + " is approved operator for " + args.owner
      + " is " + isApprovedForAll + ".");
  }); 
