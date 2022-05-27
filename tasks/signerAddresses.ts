import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";

task("signerAddresses",
  "Prints the list of signer addresses.")
  .setAction(async (_, { ethers }) => {
    const signerArray = await ethers.getSigners();

    for (const signer of signerArray) {
      console.log(signer.address);
    }
  });
