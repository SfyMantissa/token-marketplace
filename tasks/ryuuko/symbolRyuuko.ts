import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import config from '../../config';

task("symbolRyuuko",
  "Get the symbol of the token")
  .setAction(async (_, { ethers }) => {
    const Ryuuko = await ethers.getContractFactory("Ryuuko");
    const ryuuko = Ryuuko.attach(config.RYUUKO_ADDRESS);
    const symbol = await ryuuko.symbol();
    console.log('Token symbol: ' + symbol);
  });
