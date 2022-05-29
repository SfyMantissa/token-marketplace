import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import config from '../../config';

task("createItem",
  "Marketplace creates a token from address `tokenAddress` and gives it to "
  + "the `account. For ERC-1155 `tokenid` and `amount` can be used to "
  + "specify collection ID and amount of tokens to be created. For ERC-721 "
  + "these fields have no effect.")
  .addParam("tokenAddress", "Address of token to be created "
    + "(must by Ryuuko or Satsuki).")
  .addParam("account", "Receiver of token(s).")
  .addParam("tokenId", "Collection ID (for ERC-1155.)")
  .addParam("amount", "Amount to be created for collection (for ERC-1155).")
  .setAction(async (args, { ethers }) => {
    const Marketplace = await ethers.getContractFactory("Marketplace");
    const marketplace = Marketplace.attach(config.MARKETPLACE_ADDRESS);
    const txCreateItem = marketplace.createItem(
      args.tokenAddress,
      args.account,
      args.tokenId,
      args.amount
    );

    const rCreateItem = await (await txCreateItem).wait();

    const recepient = rCreateItem.events[1].args[1];
    const tokenId = rCreateItem.events[1].args[2];
    const amount = rCreateItem.events[1].args[3];

    if (args.tokenAddress == config.RYUUKO_ADDRESS) {
      console.log("Created Ryuuko token with ID " + tokenId + " for "
        + recepient + ".");
    } else {
      console.log("Created " + amount
        + " of Satsuki tokens from collection with ID " + tokenId + " for "
        + recepient + ".");
    }
  });
