import * as fs from 'fs';
import { ethers } from "hardhat";
import config from '../config';

const updateDeploymentAddress = async (address: string) => {
  let config: string = './config.ts';
  fs.readFile(config, 'utf-8', (err: unknown, data: string) => {
    if (err) throw err;
    let regex = /RYUUKO_ADDRESS: ".*",/g;
    let update = data.replace(
      regex,
      'RYUUKO_ADDRESS: "' + address + '",'
    );

    fs.writeFile(config, update, 'utf-8', (err: unknown) => {
      if (err) throw err;
      console.log('Updated RYUUKO_ADDRESS in config.ts.');
    });
  });
};

const main = async () => {
  const Ryuuko = await ethers.getContractFactory("Ryuuko");
  const ryuuko = await Ryuuko.deploy(
    config.RYUUKO_FULLNAME,
    config.RYUUKO_IPFS_CID,
  );
  await ryuuko.deployed();
  console.log("Ryuuko deployed to:", ryuuko.address);
  updateDeploymentAddress(ryuuko.address);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
