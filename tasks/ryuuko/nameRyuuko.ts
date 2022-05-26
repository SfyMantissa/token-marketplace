import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
import config from '../../config';

task("nameRyuuko",
  "Get the name of the token")
  .setAction(async (_, { ethers }) => {
    const Ryuuko = await ethers.getContractFactory("Ryuuko");
    const ryuuko = Ryuuko.attach(config.RYUUKO_ADDRESS);
    const name = await ryuuko.name();
    console.log('Token name: ' + name);
  });
