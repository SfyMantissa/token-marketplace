import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import config from '../../config';

task("finishAuction",
  "Caller can finish the auction with a given ID (caller must be auction starter)")
  .addParam("signer", "ID of the signer used to make the call.")
  .addParam("auction", "Auction ID.")
  .setAction(async (args, { ethers }) => {
    const Marketplace = await ethers.getContractFactory("Marketplace");
    const marketplace = Marketplace.attach(config.MARKETPLACE_ADDRESS);
    const signerArray = await ethers.getSigners();

    const txFinishAuction = marketplace.connect(
      signerArray[args.signer]).finishAuction(args.auction);

    const rFinishAuction = await (await txFinishAuction).wait();

    const winner = rFinishAuction.events[2].args[0];
    const auction = rFinishAuction.events[2].args[1];

    console.log(winner + " receives the prize in auction " + auction + ".");

  });
