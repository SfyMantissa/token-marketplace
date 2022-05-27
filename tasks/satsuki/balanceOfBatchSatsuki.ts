import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import config from '../../config';

task("balanceOfBatchSatsuki",
  "Get the Satsuki batch balance for multiple accounts and tokens.")
  .addParam("accounts", "User addresses array.")
  .addParam("tokenids", "IDs of the token collections array.")
  .setAction(async (args, { ethers }) => {
    const Satsuki = await ethers.getContractFactory("Satsuki");
    const satsuki = Satsuki.attach(config.SATSUKI_ADDRESS);

    let accounts = args.accounts.split(',');
    let tokenIds = args.tokenids.split(',');

    const balanceOf = await satsuki.balanceOfBatch(accounts, tokenIds);

    for (let i = 0; i < accounts.length; i++) {
      console.log(accounts[i] + ' has ' + balanceOf[i]
        + ' of Satsuki tokens with ID ' + tokenIds[i] + '.');
    }
  });
