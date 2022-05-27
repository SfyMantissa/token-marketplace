import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import config from '../../config';

task("mintSatsuki",
  "Mint `amount` of Satsuki tokens to the `account` address from the"
  + " collection with a given `tokenid`.")
  .addParam("signer", "ID of the signer used to make the call.")
  .addParam("account", "Receiver of the minted NFT.")
  .addParam("amount", "Amount of tokens to be minted.")
  .addParam("tokenid", "Collection ID.")
  .setAction(async (args, { ethers }) => {
    const Satsuki = await ethers.getContractFactory("Satsuki");
    const satsuki = Satsuki.attach(config.SATSUKI_ADDRESS);
    const signerArray = await ethers.getSigners();
    const txMint = satsuki.connect(signerArray[args.signer]).mintSatsuki(
      args.account,
      args.tokenid,
      args.amount
    );

    const rMint = await (await txMint).wait();

    const operator = rMint.events[0].args[0];
    const receiver = rMint.events[0].args[2];
    const tokenId = rMint.events[0].args[3];
    const amount = rMint.events[0].args[4];

    console.log("Operator " + operator + " minted " + amount
      + " of Satsuki from collection with ID " + tokenId + " to "
      + receiver + ".");
  });
