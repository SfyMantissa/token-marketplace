import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import config from '../../config';

task("listItem",
  "Caller can list Ryuuko or Satsuki token(s) (specified by `tokenAddress`) "
  + "for sale using this task.")
  .addParam("signer", "ID of the signer used to make the call.")
  .addParam("tokenAddress", "Address of token to be created "
    + "(must by Ryuuko or Satsuki).")
  .addParam("price", "Price in YAC.")
  .addParam("tokenId", "Collection ID (for ERC-1155) or token ID (for ERC-721).")
  .addParam("amount", "Amount to be created for collection (for ERC-1155).")
  .setAction(async (args, { ethers }) => {
    const Marketplace = await ethers.getContractFactory("Marketplace");
    const marketplace = Marketplace.attach(config.MARKETPLACE_ADDRESS);
    const signerArray = await ethers.getSigners();

    if (args.tokenAddress == config.RYUUKO_ADDRESS) {
      const Ryuuko = await ethers.getContractFactory("Ryuuko");
      const ryuuko = Ryuuko.attach(config.RYUUKO_ADDRESS);
      await ryuuko.connect(signerArray[args.signer]).approve(
        config.MARKETPLACE_ADDRESS,
        args.tokenId
      );

      const txListItem = marketplace.connect(signerArray[args.signer]).listItem(
        args.tokenAddress,
        args.price,
        args.tokenId,
        args.amount
      );

      const rListItem = await (await txListItem).wait();

      const account = rListItem.events[2].args[1];
      const price = rListItem.events[2].args[2];
      const tokenId = rListItem.events[2].args[3];
      const itemId = rListItem.events[2].args[5];

      console.log(account + " listed Ryuuko token " + tokenId
        + " for sale for price " + price + "." + "\nItem ID is "
        + itemId + ".");
    } else {
      const Satsuki = await ethers.getContractFactory("Satsuki");
      const satsuki = Satsuki.attach(config.SATSUKI_ADDRESS);
      await satsuki.connect(signerArray[args.signer]).setApprovalForAll(
        config.MARKETPLACE_ADDRESS,
        true
      );

      const txListItem = marketplace.connect(
        signerArray[args.signer]).listItem(
          args.tokenAddress,
          args.price,
          args.tokenId,
          args.amount
        );

      const rListItem = await (await txListItem).wait();

      const account = rListItem.events[1].args[1];
      const price = rListItem.events[1].args[2];
      const tokenId = rListItem.events[1].args[3];
      const amount = rListItem.events[1].args[4];
      const itemId = rListItem.events[1].args[5];

      console.log(account + " listed Satsuki tokens from collection with ID "
        + tokenId + " in amount " + amount + " for sale for price " + price
        + "." + "\nItem ID is " + itemId + ".");
    }
  });
