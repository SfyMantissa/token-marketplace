import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers";
import config from '../config';

describe("Ryuuko", () => {

  let ryuuko: Contract;
  let zeroAddress: string = "0x0000000000000000000000000000000000000000";
  let accounts: SignerWithAddress[];

  before(async () => {
    const Ryuuko = await ethers.getContractFactory("Ryuuko");
    ryuuko = await Ryuuko.deploy(
      config.RYUUKO_FULLNAME,
      config.RYUUKO_IPFS_CID
    );
    accounts = await ethers.getSigners();
    await ryuuko.deployed();
  });

  it("mintRyuuko: should be able to mint 1 Ryuuko to account's address.", async () => {
    const txMint = ryuuko.connect(accounts[0]).mintRyuuko(accounts[1].address);
    await expect(txMint).to.emit(ryuuko, "Transfer");
    const rMint = await (await txMint).wait();
    expect(rMint.events[0].args[0]).to.equal(zeroAddress);
    expect(rMint.events[0].args[1]).to.equal(accounts[1].address);
  });

  it("tokenURI: should return a string with NFT metadata.", async () => {
    expect(await ryuuko.tokenURI(1)).to.be.a.string;
  });

  it("supportsInterface: should return a bool indicating whether the interface is supported.", async () => {
    expect(await ryuuko.supportsInterface("0x70a08231")).to.be.a('boolean');
  });

});
