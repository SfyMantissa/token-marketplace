import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import config from '../../config';

task("cancel",
  "Caller can cancel the listing of item `itemId` for token `tokenAddress`. "
  + "Caller must be the item's seller.")
  .addParam("signer", "ID of the signer used to make the call.")
  .addParam("tokenAddress", "Address of token to be created "
    + "(must by Ryuuko or Satsuki).")
  .addParam("itemId", "Item's ID.")
  .setAction(async (args, { ethers }) => {
    const Marketplace = await ethers.getContractFactory("Marketplace");
    const marketplace = Marketplace.attach(config.MARKETPLACE_ADDRESS);
    const signerArray = await ethers.getSigners();

    if (args.tokenAddress == config.RYUUKO_ADDRESS) {

      const txCancel = marketplace.connect(signerArray[args.signer]).cancel(
        args.tokenAddress,
        args.itemId
      );

      const rCancel = await (await txCancel).wait();

      const seller = rCancel.events[2].args[1];
      const price = rCancel.events[2].args[2];
      const tokenId = rCancel.events[2].args[3];
      const itemId = rCancel.events[2].args[5];

      console.log(seller + " cancelled the selling of Ryuuko token with ID "
        + tokenId + " for the price of " + price + " YAC." + "\nItem ID "
        + itemId + " is DELETED.")

    } else {

      const txCancel = marketplace.connect(signerArray[args.signer]).cancel(
        args.tokenAddress,
        args.itemId
      );

      const rCancel = await (await txCancel).wait();

      const seller = rCancel.events[1].args[1];
      const price = rCancel.events[1].args[2];
      const tokenId = rCancel.events[1].args[3];
      const amount = rCancel.events[1].args[4];
      const itemId = rCancel.events[1].args[5];

      console.log(seller
        + " cancelled the selling of Satsuki tokens from collection with ID "
        + tokenId + " in amount " + amount + " for the price of " + price
        + "YAC." + "\nItem ID " + itemId + " is DELETED.");
    }
  });
