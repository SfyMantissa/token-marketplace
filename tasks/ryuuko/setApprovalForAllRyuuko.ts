import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import config from '../../config';

task("setApprovalForAllRyuuko",
  "Allow or disallow `operator` to handle all of caller's Ryuuko assets.")
  .addParam("signer", "ID of the signer used to make the call.")
  .addParam("operator", "The supposed operator's address.")
  .addParam("isapproved", "Bool, defines whether `operator` is approved.")
  .setAction(async (args, { ethers }) => {
    const Ryuuko = await ethers.getContractFactory("Ryuuko");
    const ryuuko = Ryuuko.attach(config.RYUUKO_ADDRESS);
    const signerArray = await ethers.getSigners();
    const txSetApprovalForAllRyuuko = ryuuko.connect(
      signerArray[args.signer]).setApprovalForAll(
        args.operator,
        args.isapproved
      );

    const rSetApprovalForAllRyuuko =
      await (await txSetApprovalForAllRyuuko).wait();

    const owner = rSetApprovalForAllRyuuko.events[0].args[0];
    const operator = rSetApprovalForAllRyuuko.events[0].args[1];
    const isApproved = rSetApprovalForAllRyuuko.events[0].args[2];

    console.log(owner + " approved " + operator
      + " to manage all Ryuuko assets is " + isApproved + ".");
  });
