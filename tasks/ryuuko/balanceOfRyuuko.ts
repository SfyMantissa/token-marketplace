import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import config from '../../config';

task("balanceOfRyuuko",
  "Get the Ryuuko balance of the account")
  .addParam("account", "User's address")
  .setAction(async (taskArgs, { ethers }) => {
    const Ryuuko = await ethers.getContractFactory("Ryuuko");
    const ryuuko = Ryuuko.attach(config.RYUUKO_ADDRESS);
    const balanceOf = await ryuuko.balanceOf(taskArgs.account);
    console.log(taskArgs.account + ' has ' + balanceOf + ' of Ryuuko tokens.');
  });
