import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import config from '../../config';

task("balanceOfSatsuki",
  "Get the Satsuki balance of the account")
  .addParam("account", "User's address")
  .addParam("tokenid", "ID of the token collection.")
  .setAction(async (args, { ethers }) => {
    const Satsuki = await ethers.getContractFactory("Satsuki");
    const satsuki = Satsuki.attach(config.SATSUKI_ADDRESS);
    const balanceOf = await satsuki.balanceOf(args.account, args.tokenid);
    console.log(args.account + ' has ' + balanceOf
      + ' of Satsuki tokens with ID ' + args.tokenid + '.');
  });
