import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import config from '../../config';

task("approveRyuuko",
  "Delegate control over the NFT with `tokenid` to the `delegate`.")
  .addParam("signer", "ID of the signer used to make the call.")
  .addParam("delegate", "Address of the delegate")
  .addParam("token", "The NFT ID.")
  .setAction(async (args, { ethers }) => {
    const Ryuuko = await ethers.getContractFactory("Ryuuko");
    const ryuuko = Ryuuko.attach(config.RYUUKO_ADDRESS);
    const signerArray = await ethers.getSigners();
    const txApprove = ryuuko.connect(signerArray[args.signer]).approve(
      args.delegate,
      args.token
    );

    const rApprove = await (await txApprove).wait();

    const owner = rApprove.events[0].args[0];
    const delegate = rApprove.events[0].args[1];
    const tokenId = rApprove.events[0].args[2];

    console.log(owner + ' approved ' + delegate
      + ' to control the NFT with ID ' + tokenId + '.');
  });
