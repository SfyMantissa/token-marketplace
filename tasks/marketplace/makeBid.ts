import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import config from '../../config';

task("makeBid",
  "Caller can make bid on an existing auction.")
  .addParam("signer", "ID of the signer used to make the call.")
  .addParam("auction", "Auction ID.")
  .addParam("bid", "Amount of YAC to bid.")
  .setAction(async (args, { ethers }) => {
    const Marketplace = await ethers.getContractFactory("Marketplace");
    const marketplace = Marketplace.attach(config.MARKETPLACE_ADDRESS);

    const YetAnotherCoin = await ethers.getContractFactory("YetAnotherCoin");
    const yetAnotherCoin = YetAnotherCoin.attach(config.YETANOTHERCOIN_ADDRESS);

    const signerArray = await ethers.getSigners();


    await yetAnotherCoin.connect(signerArray[args.signer]).approve(
      config.MARKETPLACE_ADDRESS,
      args.bid
    );

    const txMakeBid = marketplace.connect(signerArray[args.signer]).makeBid(
      args.auction,
      args.bid
    );

    const rMakeBid = await (await txMakeBid).wait();

    const bidder = rMakeBid.events[1].args[0];
    const bid = rMakeBid.events[1].args[1];
    const auction = rMakeBid.events[1].args[2];

    console.log(bidder + " bid " + bid + " of YAC in auction with ID "
      + auction + ".");
  });
