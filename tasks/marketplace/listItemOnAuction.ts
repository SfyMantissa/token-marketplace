import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import config from '../../config';

task("listItemOnAuction",
  "Caller can list Ryuuko or Satsuki token(s) (specified by `tokenAddress`) "
  + "on auction using this task.")
  .addParam("signer", "ID of the signer used to make the call.")
  .addParam("tokenAddress", "Address of token to be created "
    + "(must by Ryuuko or Satsuki).")
  .addParam("initialPrice", "Initial price in YAC.")
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

      const txListItemOnAuction = marketplace.connect(
        signerArray[args.signer]).listItemOnAuction(
          args.tokenAddress,
          args.initialPrice,
          args.tokenId,
          args.amount
        );

      const rListItemOnAuction = await (await txListItemOnAuction).wait();

      const initialPrice = rListItemOnAuction.events[2].args[1];
      const tokenId = rListItemOnAuction.events[2].args[2];
      const startTimeStamp = rListItemOnAuction.events[2].args[4];
      const seller = rListItemOnAuction.events[2].args[5];
      const auction = rListItemOnAuction.events[2].args[6];

      console.log(seller + " listed Ryuuko token " + tokenId
        + " on auction for price " + initialPrice + "." + "\nAuction ID is "
        + auction + ", auction start timestamp is " + startTimeStamp + ".");
    } else {
      const Satsuki = await ethers.getContractFactory("Satsuki");
      const satsuki = Satsuki.attach(config.SATSUKI_ADDRESS);
      await satsuki.connect(signerArray[args.signer]).setApprovalForAll(
        config.MARKETPLACE_ADDRESS,
        true
      );

      const txListItemOnAuction = marketplace.connect(
        signerArray[args.signer]).listItemOnAuction(
          args.tokenAddress,
          args.initialPrice,
          args.tokenId,
          args.amount
        );

      const rListItemOnAuction = await (await txListItemOnAuction).wait();

      const initialPrice = rListItemOnAuction.events[1].args[1];
      const tokenId = rListItemOnAuction.events[1].args[2];
      const amount = rListItemOnAuction.events[1].args[3];
      const startTimeStamp = rListItemOnAuction.events[1].args[4];
      const seller = rListItemOnAuction.events[1].args[5];
      const auction = rListItemOnAuction.events[1].args[6];

      console.log(seller + " listed Satsuki tokens from collection with ID "
        + tokenId + " in amount " + amount + " on auction for price "
        + initialPrice + "." + "\nAuction ID is " + auction
        + ", auction start timestamp is " + startTimeStamp + ".");
    }
  });
