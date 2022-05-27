import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import config from '../../config';

task("setApprovalForAllSatsuki",
  "Allow or disallow `operator` to handle all of caller's Satsuki assets.")
  .addParam("signer", "ID of the signer used to make the call.")
  .addParam("operator", "The supposed operator's address.")
  .addParam("isapproved", "Bool, defines whether `operator` is approved.")
  .setAction(async (args, { ethers }) => {
    const Satsuki = await ethers.getContractFactory("Satsuki");
    const satsuki = Satsuki.attach(config.SATSUKI_ADDRESS);
    const signerArray = await ethers.getSigners();
    const txSetApprovalForAll = satsuki.connect(
      signerArray[args.signer]).setApprovalForAll(
        args.operator,
        args.isapproved
      );

    const rSetApprovalForAll = await (await txSetApprovalForAll).wait();

    const owner = rSetApprovalForAll.events[0].args[0];
    const operator = rSetApprovalForAll.events[0].args[1];
    const isApproved = rSetApprovalForAll.events[0].args[2];

    console.log(owner + " approved " + operator
      + " to manage all Satsuki assets is " + isApproved + ".");
  });
