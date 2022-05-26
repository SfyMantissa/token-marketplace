import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import config from '../../config';

task("ownerOfRyuuko",
  "Get the address which owns the Ryuuko token with a given `tokenid`.")
  .addParam("tokenid", "ID of the Ryuuko NFT.")
  .setAction(async (args, { ethers }) => {
    const Ryuuko = await ethers.getContractFactory("Ryuuko");
    const ryuuko = Ryuuko.attach(config.RYUUKO_ADDRESS);
    const ownerOfRyuuko = await ryuuko.ownerOf(args.tokenid);

    console.log(ownerOfRyuuko + " is the owner of Ryuuko NFT with ID "
      + args.tokenid + ".");
  });
