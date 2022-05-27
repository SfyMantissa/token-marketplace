import * as fs from 'fs';
import { ethers } from "hardhat";
import config from '../config';

const updateDeploymentAddress = async (address: string) => {
  let config: string = './config.ts';
  fs.readFile(config, 'utf-8', (err: unknown, data: string) => {
    if (err) throw err;
    let regex = /MARKETPLACE_ADDRESS: ".*",/g;
    let update = data.replace(
      regex,
      'MARKETPLACE_ADDRESS: "' + address + '",'
    );

    fs.writeFile(config, update, 'utf-8', (err: unknown) => {
      if (err) throw err;
      console.log('Updated MARKETPLACE_ADDRESS in config.ts.');
    });
  });
};

const main = async () => {
  const Marketplace = await ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy(
    config.RYUUKO_ADDRESS,
    config.SATSUKI_ADDRESS
  );
  await marketplace.deployed();
  console.log("Marketplace deployed to:", marketplace.address);
  updateDeploymentAddress(marketplace.address);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
