import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import config from '../../config';

task("transferFromRyuuko",
  "Transfer NFT with a given `tokenid` from `seller` to `buyer` with"
  + " additional `data`.")
  .addParam("signer", "ID of the signer used to make the call.")
  .addParam("tokenid", "ID of the Ryuuko NFT.")
  .addParam("seller", "Address of seller (current NFT owner).")
  .addParam("buyer", "Address of buyer.")
  .setAction(async (args, { ethers }) => {
    const Ryuuko = await ethers.getContractFactory("Ryuuko");
    const ryuuko = Ryuuko.attach(config.RYUUKO_ADDRESS);
    const signerArray = await ethers.getSigners();
    const txTransferFrom = ryuuko.connect(
      signerArray[args.signer]).transferFrom(
        args.seller,
        args.buyer,
        args.tokenid,
      );

    const rTransferFrom = await (await txTransferFrom).wait();

    const seller = rTransferFrom.events[1].args[0];
    const buyer = rTransferFrom.events[1].args[1];
    const tokenId = rTransferFrom.events[1].args[2];

    console.log(seller + " sent NFT with ID " + tokenId + " to "
      + buyer + ".");
  });
