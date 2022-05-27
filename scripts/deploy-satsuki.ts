import * as fs from 'fs';
import { ethers } from "hardhat";
import config from '../config';

const updateDeploymentAddress = async (address: string) => {
  let config: string = './config.ts';
  fs.readFile(config, 'utf-8', (err: unknown, data: string) => {
    if (err) throw err;
    let regex = /SATSUKI_ADDRESS: ".*",/g;
    let update = data.replace(
      regex,
      'SATSUKI_ADDRESS: "' + address + '",'
    );

    fs.writeFile(config, update, 'utf-8', (err: unknown) => {
      if (err) throw err;
      console.log('Updated SATSUKI_ADDRESS in config.ts.');
    });
  });
};

const main = async () => {
  const Satsuki = await ethers.getContractFactory("Satsuki");
  const satsuki = await Satsuki.deploy(
    config.SATSUKI_IPFS_STRING,
  );
  await satsuki.deployed();
  console.log("Satsuki deployed to:", satsuki.address);
  updateDeploymentAddress(satsuki.address);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
