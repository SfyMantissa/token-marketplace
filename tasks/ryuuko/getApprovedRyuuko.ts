import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import config from '../../config';

task("getApprovedRyuuko",
  "Get the approved address for the NFT with `tokenid`.")
  .addParam("token", "The NFT ID.")
  .setAction(async (args, { ethers }) => {
    const Ryuuko = await ethers.getContractFactory("Ryuuko");
    const ryuuko = Ryuuko.attach(config.RYUUKO_ADDRESS);
    const getApproved = await ryuuko.getApproved(args.token);
    console.log("The approved address for NFT with ID " + args.token
      + " is " + getApproved);
  });
