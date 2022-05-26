import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import config from '../../config';

task("mintRyuuko",
  "Mint a Ryuuko NFT token to the `account` address.")
  .addParam("signer", "ID of the signer used to make the call.")
  .addParam("account", "Receiver of the minted NFT.")
  .setAction(async (args, { ethers }) => {
    const Ryuuko = await ethers.getContractFactory("Ryuuko");
    const ryuuko = Ryuuko.attach(config.RYUUKO_ADDRESS);
    const signerArray = await ethers.getSigners();
    const txMint = ryuuko.connect(signerArray[args.signer]).mintRyuuko(
      args.account
    );

    const rMint = await (await txMint).wait();

    const receiver = rMint.events[0].args[1];
    const tokenId = rMint.events[0].args[2];

    console.log("Minted Ryuuko NFT with ID " + tokenId + " to "
      + receiver + ".");
  });
