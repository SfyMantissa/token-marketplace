import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import config from '../../config';

task("safeTransferFromSatsuki",
  "Transfer Satsuki tokens from collection with a given `tokenid` from"
  + " `seller` to `buyer` in a specified `amount`.")
  .addParam("signer", "ID of the signer used to make the call.")
  .addParam("tokenid", "Collection ID.")
  .addParam("seller", "Address of seller (current tokens owner).")
  .addParam("buyer", "Address of buyer.")
  .addParam("amount", "Amount of tokens to be transferred.")
  .setAction(async (args, { ethers }) => {
    const Satsuki = await ethers.getContractFactory("Satsuki");
    const satsuki = Satsuki.attach(config.SATSUKI_ADDRESS);
    const signerArray = await ethers.getSigners();
    const txSafeTransferFrom = satsuki.connect(
      signerArray[args.signer]).safeTransferFrom(
        args.seller,
        args.buyer,
        args.tokenid,
        args.amount,
        ethers.utils.randomBytes(1)
      );

    const rSafeTransferFrom = await (await txSafeTransferFrom).wait();

    const operator = rSafeTransferFrom.events[0].args[0];
    const seller = rSafeTransferFrom.events[0].args[1];
    const buyer = rSafeTransferFrom.events[0].args[2];
    const tokenId = rSafeTransferFrom.events[0].args[3];
    const amount = rSafeTransferFrom.events[0].args[4];

    console.log(operator + " sent " + amount
      + " of Satsuki tokens from collection with ID " + tokenId
      + " on behalf of " + seller + " to " + buyer + ".");
  });
