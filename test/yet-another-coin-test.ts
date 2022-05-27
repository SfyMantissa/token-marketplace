import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers";

describe("YetAnotherCoin", () => {

  let yetAnotherCoin: Contract;
  let zeroAddress: string = "0x0000000000000000000000000000000000000000";
  let accounts: SignerWithAddress[];

  before(async () => {
    const YetAnotherCoin = await ethers.getContractFactory("YetAnotherCoin");
    yetAnotherCoin = await YetAnotherCoin.deploy(
      "YetAnotherCoin",
      "YAC",
      5,
      100000
    );
    accounts = await ethers.getSigners();
    await yetAnotherCoin.deployed();
  });

  it("name: should be able to get coin's name.", async () => {
    expect(await yetAnotherCoin.name()).to.equal('YetAnotherCoin');
  });

  it("symbol: should be able to get coin's symbol.", async () => {
    expect(await yetAnotherCoin.symbol()).to.equal('YAC');
  });

  it("decimals: should be able to get coin's decimals.", async () => {
    expect(await yetAnotherCoin.decimals()).to.equal(5);
  });

  it("totalSupply: should be able to get coin's total supply.", async () => {
    expect(await yetAnotherCoin.totalSupply()).to.equal(100000);
  });

  it("balanceOf: should return balance of account1.", async () => {
    expect(await yetAnotherCoin.balanceOf(accounts[1].address)).to.equal(0);
  });

  it("mint: should revert given a zero-address.", async () => {
    await expect(yetAnotherCoin.mint(zeroAddress, 100)).to.be.revertedWith('Receiving account must have a non-zero address!');
  });

  it("mint: should give account1 1000 tokens and increase totalSupply by 1000.", async () => {
    const txMint = yetAnotherCoin.mint(accounts[1].address, 1000);
    await expect(txMint).to.emit(yetAnotherCoin, "Transfer");
    const rMint = await (await txMint).wait();
    expect(rMint.events[0].args[0]).to.equal(zeroAddress);
    expect(rMint.events[0].args[1]).to.equal(accounts[1].address);
    expect(rMint.events[0].args[2]).to.equal(1000);

    expect(await yetAnotherCoin.totalSupply()).to.equal(101000);
  });

  it("burn: should revert given a zero-address.", async () => {
    await expect(yetAnotherCoin.burn(zeroAddress, 100)).to.be.revertedWith('Burner account must have a non-zero address!');
  });

  it("burn: should revert given amount to burn exceeds account's balance", async () => {
    await expect(yetAnotherCoin.burn(accounts[1].address, 2000)).to.be.revertedWith('Burn amount must not exceed balance!');
  });

  it("burn: should burn 50 tokens of account1 and decrease totalSupply by 50", async () => {
    const txBurn = yetAnotherCoin.burn(accounts[1].address, 50);
    await expect(txBurn).to.emit(yetAnotherCoin, "Transfer");
    const rBurn = await (await txBurn).wait();
    expect(rBurn.events[0].args[0]).to.equal(accounts[1].address);
    expect(rBurn.events[0].args[1]).to.equal(zeroAddress);
    expect(rBurn.events[0].args[2]).to.equal(50);

    expect(await yetAnotherCoin.totalSupply()).to.equal(100950);
  });

  it("transfer: should revert upon trying to send to a zero-address.", async () => {
    await expect(yetAnotherCoin.transfer(zeroAddress, 100)).to.be.revertedWith('Buyer must have a non-zero address!');
  });

  it("transfer: should revert upon trying to send amount which exceeds balance.", async () => {
    await expect(yetAnotherCoin.transfer(accounts[1].address, 200000)).to.be.revertedWith('Seller does not have the specified amount!');
  });

  it("transfer: should send 2000 tokens to account1.", async () => {
    const txTransfer = yetAnotherCoin.transfer(accounts[1].address, 2000);
    await expect(txTransfer).to.emit(yetAnotherCoin, "Transfer");
    const rTransfer = await (await txTransfer).wait();
    expect(rTransfer.events[0].args[0]).to.equal(accounts[0].address);
    expect(rTransfer.events[0].args[1]).to.equal(accounts[1].address);
    expect(rTransfer.events[0].args[2]).to.equal(2000);
  });

  // it("transferFrom: should revert if buyer has a zero-address.", async () => {
  //   await expect(yetAnotherCoin.transferFrom(accounts[1].address, zeroAddress, 3000)).to.be.revertedWith('Buyer must have a non-zero address!');
  // });

  // it("transferFrom: should revert if the balance of seller exceeds the amount to transact.", async () => {
  //   await expect(yetAnotherCoin.transferFrom(accounts[1].address, accounts[2].address, 10000)).to.be.revertedWith('Seller does not have the specified amount!');
  // });

  it("transferFrom: should revert if delegate doesn't have enough allowance.", async () => {
    await expect(yetAnotherCoin.transferFrom(accounts[1].address, accounts[2].address, 100)).to.be.revertedWith('Delegate does not have enough allowance!');
  });

  it("approve: should revert if delegate has a zero-address.", async () => {
    await expect(yetAnotherCoin.approve(zeroAddress, 100)).to.be.revertedWith('Delegate must have a non-zero address!');
  });

  it("approve: should give account2 the ability to transact up to 5000 tokens from owner's balance.", async () => {
    const txApprove = yetAnotherCoin.approve(accounts[2].address, 5000);
    await expect(txApprove).to.emit(yetAnotherCoin, "Approval");
    const rApprove = await (await txApprove).wait();
    expect(rApprove.events[0].args[0]).to.equal(accounts[0].address);
    expect(rApprove.events[0].args[1]).to.equal(accounts[2].address);
    expect(rApprove.events[0].args[2]).to.equal(5000);
  });

  it("allowance: should be able to see that account2 now has a 5000 token allowance from the owner.", async () => {
    expect(await yetAnotherCoin.allowance(accounts[0].address, accounts[2].address)).to.equal(5000);
  });

  it("transferFrom: should revert if seller has a zero-address.", async () => {
    await expect(yetAnotherCoin.transferFrom(zeroAddress, accounts[2].address, 3000)).to.be.revertedWith('Seller must have a non-zero address!');
  });

  it("transferFrom: account2 should be able to send 5000 tokens on behalf of the owner to account1.", async () => {
    const txTransferFrom = yetAnotherCoin.connect(accounts[2]).transferFrom(accounts[0].address, accounts[1].address, 5000);
    await expect(txTransferFrom).to.emit(yetAnotherCoin, "Transfer");
    const rTransferFrom = await (await txTransferFrom).wait();
    expect(rTransferFrom.events[0].args[0]).to.equal(accounts[0].address);
    expect(rTransferFrom.events[0].args[1]).to.equal(accounts[1].address);
    expect(rTransferFrom.events[0].args[2]).to.equal(5000);
  });

});
