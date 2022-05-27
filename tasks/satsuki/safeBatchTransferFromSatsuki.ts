import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import config from '../../config';

task("safeBatchTransferFromSatsuki",
  "Transfer Satsuki tokens from collections with given `tokenids` from"
  + " `seller` to `buyer` in specified `amounts`.")
  .addParam("signer", "ID of the signer used to make the call.")
  .addParam("tokenids", "Collections IDs.")
  .addParam("seller", "Address of seller (current tokens owner).")
  .addParam("buyer", "Address of buyer.")
  .addParam("amounts", "Amounts of tokens to be transferred by collection.")
  .setAction(async (args, { ethers }) => {
    const Satsuki = await ethers.getContractFactory("Satsuki");
    const satsuki = Satsuki.attach(config.SATSUKI_ADDRESS);
    const signerArray = await ethers.getSigners();

    let _tokenids = args.tokenids.split(',');
    let _amounts = args.amounts.split(',');

    const txSafeBatchTransferFrom = satsuki.connect(
      signerArray[args.signer]).safeBatchTransferFrom(
        args.seller,
        args.buyer,
        _tokenids,
        _amounts,
        ethers.utils.randomBytes(1)
      );

    const rSafeBatchTransferFrom
      = await (await txSafeBatchTransferFrom).wait();

    const operator = rSafeBatchTransferFrom.events[0].args[0];
    const seller = rSafeBatchTransferFrom.events[0].args[1];
    const buyer = rSafeBatchTransferFrom.events[0].args[2];
    const tokenIds = rSafeBatchTransferFrom.events[0].args[3];
    const amounts = rSafeBatchTransferFrom.events[0].args[4];

    console.log(operator + " sent on behalf of " + seller
      + " to " + buyer + ":");

    for (let i = 0; i < tokenIds.length; i++) {
      console.log(amounts[i] + " Satsuki tokens from collection with ID "
        + tokenIds[i] + ".")
    }

  });
