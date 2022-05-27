import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers";
import config from '../config';

describe("Satsuki", () => {

  let satsuki: Contract;
  let zeroAddress: string = "0x0000000000000000000000000000000000000000";
  let accounts: SignerWithAddress[];

  before(async () => {
    const Satsuki = await ethers.getContractFactory("Satsuki");
    satsuki = await Satsuki.deploy(
      config.SATSUKI_IPFS_STRING
    );
    accounts = await ethers.getSigners();
    await satsuki.deployed();
  });

  it("mintSatsuki: should be able to mint 1 Satsuki from the first collection to account's address.", async () => {
    const txMint = satsuki.connect(accounts[0]).mintSatsuki(accounts[1].address, 1, 1);
    await expect(txMint).to.emit(satsuki, "TransferSingle");
    const rMint = await (await txMint).wait();
    expect(rMint.events[0].args[0]).to.equal(accounts[0].address);
    expect(rMint.events[0].args[1]).to.equal(zeroAddress);
    expect(rMint.events[0].args[2]).to.equal(accounts[1].address);
    expect(rMint.events[0].args[3]).to.equal(1);
    expect(rMint.events[0].args[4]).to.equal(1);
  });

  it("uri: should return a string with NFT metadata.", async () => {
    expect(await satsuki.uri(1)).to.be.a.string;
  });

  it("supportsInterface: should return a bool indicating whether the interface is supported.", async () => {
    expect(await satsuki.supportsInterface("0x70a08231")).to.be.a('boolean');
  });

});
