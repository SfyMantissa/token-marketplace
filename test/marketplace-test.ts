import { expect } from "chai";
import { ethers } from "hardhat";
const hre = require("hardhat");
import "@nomiclabs/hardhat-ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers";
import config from "../config";

describe("Marketplace", () => {

  let marketplace: Contract;
  let satsuki: Contract;
  let ryuuko: Contract;
  let yetAnotherCoin: Contract;
  let owner: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;
  let user3: SignerWithAddress;
  let itemId1: string;
  let itemId2: string;
  let itemId3: string;
  let itemId4: string;
  let itemId5: string;
  let itemId6: string;
  let itemId7: string;
  let itemId8: string;

  before(async () => {
    const Ryuuko = await ethers.getContractFactory("Ryuuko");
    ryuuko = await Ryuuko.deploy(
      config.RYUUKO_FULLNAME,
      config.RYUUKO_IPFS_CID,
    );
    await ryuuko.deployed();

    const Satsuki = await ethers.getContractFactory("Satsuki");
    satsuki = await Satsuki.deploy(
      config.SATSUKI_IPFS_STRING
    );
    await satsuki.deployed();

    const YetAnotherCoin = await ethers.getContractFactory("YetAnotherCoin");
    yetAnotherCoin = await YetAnotherCoin.deploy(
      "YetAnotherCoin",
      "YAC",
      5,
      100000
    );
    await yetAnotherCoin.deployed();

    const Marketplace = await ethers.getContractFactory("Marketplace");
    marketplace = await Marketplace.deploy(
      ryuuko.address,
      satsuki.address,
      yetAnotherCoin.address
    );
    await marketplace.deployed();


    [owner, user1, user2, user3] = await ethers.getSigners();

    await ryuuko.grantRole(ryuuko.MINTER_ROLE(), marketplace.address);
    await satsuki.grantRole(satsuki.MINTER_ROLE(), marketplace.address);
    await yetAnotherCoin.mint(user1.address, 1000);
  });

  it("createItem: should revert if specified token address is unknown.", async () => {
    await expect(marketplace.createItem(user1.address, user2.address, 0, 0)).to.be.reverted;
  });

  it("createItem: should be able to grant a Ryuuko token to user1.", async () => {
    const txCreateItem = marketplace.createItem(ryuuko.address, user1.address, 0, 0);
    const rCreateItem = await (await txCreateItem).wait();

    expect(rCreateItem.events[1].args[0]).to.equal(ryuuko.address);
    expect(rCreateItem.events[1].args[1]).to.equal(user1.address);
    expect(rCreateItem.events[1].args[2]).to.equal(2);
    expect(rCreateItem.events[1].args[3]).to.equal(0);
  });

  it("createItem: should be able to grant Satsuki tokens to user1.", async () => {
    const txCreateItem = marketplace.createItem(satsuki.address, user1.address, 1, 10);
    const rCreateItem = await (await txCreateItem).wait();

    expect(rCreateItem.events[1].args[0]).to.equal(satsuki.address);
    expect(rCreateItem.events[1].args[1]).to.equal(user1.address);
    expect(rCreateItem.events[1].args[2]).to.equal(1);
    expect(rCreateItem.events[1].args[3]).to.equal(10);
  });

  it("listItem: user1 should be able to list a Ryuuko token with ID 2.", async () => {
    await ryuuko.connect(user1).approve(marketplace.address, 2);

    const txListItem = marketplace.connect(user1).listItem(ryuuko.address, 100, 2, 0);
    const rListItem = await (await txListItem).wait();

    expect(rListItem.events[2].args[0]).to.equal(ryuuko.address);
    expect(rListItem.events[2].args[1]).to.equal(user1.address);
    expect(rListItem.events[2].args[2]).to.equal(100);
    expect(rListItem.events[2].args[3]).to.equal(2);
    expect(rListItem.events[2].args[4]).to.equal(0);
    expect(rListItem.events[2].args[5]).to.be.a('string');

    itemId1 = rListItem.events[2].args[5];
  });

  it("listItem: user1 should be able to list Satsuki tokens.", async () => {
    await satsuki.connect(user1).setApprovalForAll(marketplace.address, true);

    const txListItem = marketplace.connect(user1).listItem(satsuki.address, 50, 1, 5);
    const rListItem = await (await txListItem).wait();
    
    expect(rListItem.events[1].args[0]).to.equal(satsuki.address);
    expect(rListItem.events[1].args[1]).to.equal(user1.address);
    expect(rListItem.events[1].args[2]).to.equal(50);
    expect(rListItem.events[1].args[3]).to.equal(1);
    expect(rListItem.events[1].args[4]).to.equal(5);
    expect(rListItem.events[1].args[5]).to.be.a('string');

    itemId2 = rListItem.events[1].args[5];
  });

  it("cancel: should revert if caller is not the seller", async () => {
    await expect(marketplace.connect(user2).cancel(ryuuko.address, itemId1)).to.be.reverted;
  });

  it("cancel: should be able to cancel Ryuuko token listing", async () => {
    const txCancel = marketplace.connect(user1).cancel(ryuuko.address, itemId1);
    const rCancel = await (await txCancel).wait();

    expect(rCancel.events[2].args[0]).to.equal(ryuuko.address);
    expect(rCancel.events[2].args[1]).to.equal(user1.address);
    expect(rCancel.events[2].args[2]).to.equal(100);
    expect(rCancel.events[2].args[3]).to.equal(2);
    expect(rCancel.events[2].args[4]).to.equal(0);
    expect(rCancel.events[2].args[5]).to.equal(itemId1);
  });

  it("cancel: should be able to cancel Satsuki tokens listing", async () => {
    const txCancel = marketplace.connect(user1).cancel(satsuki.address, itemId2);
    const rCancel = await (await txCancel).wait();

    expect(rCancel.events[1].args[0]).to.equal(satsuki.address);
    expect(rCancel.events[1].args[1]).to.equal(user1.address);
    expect(rCancel.events[1].args[2]).to.equal(50);
    expect(rCancel.events[1].args[3]).to.equal(1);
    expect(rCancel.events[1].args[4]).to.equal(5);
    expect(rCancel.events[1].args[5]).to.equal(itemId2);
  });

  it("buyItem: should revert because user2 doesn't have enouth YAC to buy", async () => {
    await ryuuko.connect(user1).approve(marketplace.address, 2);
    const txListItem =  marketplace.connect(user1).listItem(ryuuko.address, 100, 2, 0);
    const rListItem = await (await txListItem).wait();
    itemId3 = rListItem.events[2].args[5];

    await expect(marketplace.connect(user2).buyItem(ryuuko.address, itemId3)).to.be.reverted;
  });

  it("buyItem: should be able to buy Ryuuko token with ID 2 as owner", async () => {
    const itemData = await marketplace.items(itemId3);
    await yetAnotherCoin.connect(owner).approve(marketplace.address, 10000);

    const txBuyItem = marketplace.connect(owner).buyItem(ryuuko.address, itemId3);
    const rBuyItem = await (await txBuyItem).wait();

    expect(rBuyItem.events[3].args[0]).to.equal(ryuuko.address);
    expect(rBuyItem.events[3].args[1]).to.equal(user1.address);
    expect(rBuyItem.events[3].args[2]).to.equal(100);
    expect(rBuyItem.events[3].args[3]).to.equal(2);
    expect(rBuyItem.events[3].args[4]).to.equal(0);
    expect(rBuyItem.events[3].args[5]).to.equal(itemId3);
  });

  it("buyItem: should be able to buy 5 Satsuki tokens from collection 1", async () => {
    await satsuki.connect(user1).setApprovalForAll(marketplace.address, true);
    const txListItem = marketplace.connect(user1).listItem(satsuki.address, 50, 1, 5);
    const rListItem = await (await txListItem).wait();
    itemId4 = rListItem.events[1].args[5];

    const txBuyItem = marketplace.connect(owner).buyItem(satsuki.address, itemId4);
    const rBuyItem = await (await txBuyItem).wait();

    expect(rBuyItem.events[2].args[0]).to.equal(satsuki.address);
    expect(rBuyItem.events[2].args[1]).to.equal(user1.address);
    expect(rBuyItem.events[2].args[2]).to.equal(50);
    expect(rBuyItem.events[2].args[3]).to.equal(1);
    expect(rBuyItem.events[2].args[4]).to.equal(5);
    expect(rBuyItem.events[2].args[5]).to.equal(itemId4);
  });

  it("listItemOnAuction: owner should be able to place Ryuuko token with ID 2 on auction", async () => {
    await ryuuko.connect(owner).approve(marketplace.address, 2);

    const txListItemOnAuction = marketplace.connect(owner).listItemOnAuction(ryuuko.address, 50, 2, 0);
    const rListItemOnAuction = await (await txListItemOnAuction).wait();

    expect(rListItemOnAuction.events[2].args[0]).to.equal(true);
    expect(rListItemOnAuction.events[2].args[1]).to.equal(50);
    expect(rListItemOnAuction.events[2].args[2]).to.equal(2);
    expect(rListItemOnAuction.events[2].args[3]).to.equal(0);
    expect(rListItemOnAuction.events[2].args[5]).to.equal(owner.address);
    expect(rListItemOnAuction.events[2].args[6]).to.be.a('string');

    itemId5 = rListItemOnAuction.events[2].args[6];
  });

  it("makeBid: should revert because owner started the auction", async () => {
    await expect(marketplace.connect(owner).makeBid(itemId5, 60)).to.be.revertedWith("Can't bid on your own auctions.");
  });

  it("makeBid: should revert because the bid is smaller than the maxBid", async () => {
    await yetAnotherCoin.mint(user1.address, 1000);
    await expect(marketplace.connect(user1).makeBid(itemId5, 10)).to.be.revertedWith("New bid must be grater than the current maximum bid.");
  });

  it("makeBid: should revert because YAC balance is insufficient", async () => {
    await expect(marketplace.connect(user2).makeBid(itemId5, 60)).to.be.revertedWith("Insufficient YAC balance.");
  });

  it("makeBid: user1 should be able to make the bid", async () => {
    await yetAnotherCoin.connect(user1).approve(marketplace.address, 100);

    const txMakeBid = marketplace.connect(user1).makeBid(itemId5, 100);
    const rMakeBid = await (await txMakeBid).wait();

    expect(rMakeBid.events[1].args[0]).to.equal(user1.address);
    expect(rMakeBid.events[1].args[1]).to.equal(100);
    expect(rMakeBid.events[1].args[2]).to.equal(itemId5);
  });

  it("makeBid: should revert because user1 tries to bid again", async () => {
    await yetAnotherCoin.connect(user1).approve(marketplace.address, 200);
    await expect(marketplace.connect(user1).makeBid(itemId5, 200)).to.be.revertedWith("You can only bid once.");
  });

  it("makeBid: user2 should also be able to make the bid", async () => {
    await yetAnotherCoin.mint(user2.address, 100000);
    await yetAnotherCoin.connect(user2).approve(marketplace.address, 500);

    const txMakeBid = marketplace.connect(user2).makeBid(itemId5, 500);
    const rMakeBid = await (await txMakeBid).wait();

    expect(rMakeBid.events[1].args[0]).to.equal(user2.address);
    expect(rMakeBid.events[1].args[1]).to.equal(500);
    expect(rMakeBid.events[1].args[2]).to.equal(itemId5);
  });

  it("finishAuction: should revert because 3 days have not yet passed", async () => {
    await expect(marketplace.connect(owner).finishAuction(itemId5)).to.be.revertedWith("The auction cannot be ended prematurely.")
  });

  it("makeBid: for user3 should revert because bids are no longer accepted", async () => {

    // increase time by 3 days
    await hre.ethers.provider.send("evm_increaseTime", [60 * 60 * 24 * 3]);

    await yetAnotherCoin.mint(user3.address, 100000);
    await yetAnotherCoin.connect(user3).approve(marketplace.address, 1000);

    await expect(marketplace.connect(user3).makeBid(itemId5, 1000)).to.be.revertedWith("New bids no longer accepted :(")
  });

  it("finishAuction: should revert because user2 is not the starter of the auction", async () => {
    await expect(marketplace.connect(user2).finishAuction(itemId5)).to.be.revertedWith("Only auction creator can finish the auction.");
  });

  it("finishAuction: should finish, award no one since the number of bidder is < 2", async () => {
    const txFinishAuction = marketplace.connect(owner).finishAuction(itemId5);
    const rFinishAuction = await (await txFinishAuction).wait();

    expect(rFinishAuction.events[2].args[0]).to.equal(owner.address);
    expect(rFinishAuction.events[2].args[1]).to.equal(itemId5);
  });

  it("listItemOnAuction: owner should be able to place Satsuki tokens on auction", async () => {
    await satsuki.connect(owner).setApprovalForAll(marketplace.address, true);

    const txListItemOnAuction = marketplace.connect(owner).listItemOnAuction(satsuki.address, 100, 1, 5);
    const rListItemOnAuction = await (await txListItemOnAuction).wait();

    expect(rListItemOnAuction.events[1].args[0]).to.equal(false);
    expect(rListItemOnAuction.events[1].args[1]).to.equal(100);
    expect(rListItemOnAuction.events[1].args[2]).to.equal(1);
    expect(rListItemOnAuction.events[1].args[3]).to.equal(5);
    expect(rListItemOnAuction.events[1].args[5]).to.equal(owner.address);
    expect(rListItemOnAuction.events[1].args[6]).to.be.a('string');

    itemId6 = rListItemOnAuction.events[1].args[6];
  });

  it("makeBid: user1, user2, user3 should be able to make bids", async () => {
    await yetAnotherCoin.mint(user1.address, 100000);
    await yetAnotherCoin.mint(user2.address, 100000);
    await yetAnotherCoin.mint(user3.address, 100000);

    await yetAnotherCoin.connect(user1).approve(marketplace.address, 100000);
    await yetAnotherCoin.connect(user2).approve(marketplace.address, 100000);
    await yetAnotherCoin.connect(user3).approve(marketplace.address, 100000);

    const txMakeBid1 = marketplace.connect(user1).makeBid(itemId6, 500);
    const rMakeBid1 = await (await txMakeBid1).wait();

    expect(rMakeBid1.events[1].args[0]).to.equal(user1.address);
    expect(rMakeBid1.events[1].args[1]).to.equal(500);
    expect(rMakeBid1.events[1].args[2]).to.equal(itemId6);

    const txMakeBid2 = marketplace.connect(user2).makeBid(itemId6, 1000);
    const rMakeBid2 = await (await txMakeBid2).wait();

    expect(rMakeBid2.events[1].args[0]).to.equal(user2.address);
    expect(rMakeBid2.events[1].args[1]).to.equal(1000);
    expect(rMakeBid2.events[1].args[2]).to.equal(itemId6);
    
    const txMakeBid3 = marketplace.connect(user3).makeBid(itemId6, 1500);
    const rMakeBid3 = await (await txMakeBid3).wait();

    expect(rMakeBid3.events[1].args[0]).to.equal(user3.address);
    expect(rMakeBid3.events[1].args[1]).to.equal(1500);
    expect(rMakeBid3.events[1].args[2]).to.equal(itemId6);
  });

  it("finishAuction: should finish, award user3", async () => {
    // increase time by 3 days
    await hre.ethers.provider.send("evm_increaseTime", [60 * 60 * 24 * 3]);

    const txFinishAuction = marketplace.connect(owner).finishAuction(itemId6);
    const rFinishAuction = await (await txFinishAuction).wait();

    expect(rFinishAuction.events[4].args[0]).to.equal(user3.address);
    expect(rFinishAuction.events[4].args[1]).to.equal(itemId6);
  });

  it("listItemOnAuction → makeBid → finishAuction: owner should be able to place Ryuuko token with ID 1 on auction, then bids occur and user2 wins.", async () => {
    await ryuuko.connect(owner).approve(marketplace.address, 1);
    const txListItemOnAuction = marketplace.connect(owner).listItemOnAuction(ryuuko.address, 60, 1, 0);
    const rListItemOnAuction = await (await txListItemOnAuction).wait();
    itemId7 = rListItemOnAuction.events[2].args[6];

    await marketplace.connect(user1).makeBid(itemId7, 150);
    await marketplace.connect(user3).makeBid(itemId7, 350);
    await marketplace.connect(user2).makeBid(itemId7, 750);

    await hre.ethers.provider.send("evm_increaseTime", [60 * 60 * 24 * 3]);

    const txFinishAuction = marketplace.connect(owner).finishAuction(itemId7);
    const rFinishAuction = await (await txFinishAuction).wait();

    expect(rFinishAuction.events[5].args[0]).to.equal(user2.address);
    expect(rFinishAuction.events[5].args[1]).to.equal(itemId7);
  });

  it("listItemOnAuction → makeBid → finishAuction: owner should be able to place 1 Satsuki token with ID 1 on auction, then bids occur and no one wins.", async () => {
    await satsuki.connect(owner).setApprovalForAll(marketplace.address, true);

    const txListItemOnAuction = marketplace.connect(owner).listItemOnAuction(satsuki.address, 100, 1, 1);
    const rListItemOnAuction = await (await txListItemOnAuction).wait();

    itemId8 = rListItemOnAuction.events[1].args[6];

    await marketplace.connect(user1).makeBid(itemId8, 150);
    await marketplace.connect(user3).makeBid(itemId8, 350);

    await hre.ethers.provider.send("evm_increaseTime", [60 * 60 * 24 * 3]);

    const txFinishAuction = marketplace.connect(owner).finishAuction(itemId8);
    const rFinishAuction = await (await txFinishAuction).wait();

    expect(rFinishAuction.events[1].args[0]).to.equal(owner.address);
    expect(rFinishAuction.events[1].args[1]).to.equal(itemId8);
  });

});
