// SPDX-License-Identifier: UNLICENCEDH

pragma solidity ^0.8.8;

import './Ryuuko.sol';
import './Satsuki.sol';
import './YetAnotherCoin.sol';

import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

contract Marketplace is ERC1155Holder {

  address public ryuukoAddress;
  address public satsukiAddress;
  address public yetAnotherCoinAddress;

  mapping(bytes32 => Item) public items;
  mapping(bytes32 => Auction) public auctions;

  struct Item {
    uint256 price;
    uint256 tokenId;
    uint256 amount;
    address seller;
  }

  struct Auction {
    uint256 maxBid;
    mapping(address => uint256) bids;
    address[] bidders;
    uint256 tokenId;
    uint256 amount;
    uint256 bidsTotal;
    uint256 startTimeStamp;
    address seller;
    address currentLeader;
    bool isRyuuko;
  }

  event ItemCreated(
    address _tokenAddress,
    address _account,
    uint256 _tokenId,
    uint256 _amount
  );

  event ItemListed(
    address _tokenAddress,
    address _seller,
    uint256 _price,
    uint256 _tokenId,
    uint256 _amount,
    bytes32 _itemId
  );

  event ListingCancelled(
    address _tokenAddress,
    address _seller,
    uint256 _price,
    uint256 _tokenId,
    uint256 _amount,
    bytes32 _itemId
  );

  event ItemBought(
    address _tokenAddress,
    address _seller,
    uint256 _price,
    uint256 _tokenId,
    uint256 _amount,
    bytes32 _itemId
  );

  event AuctionStarted(
    bool _isRyuuko,
    uint256 _maxBid,
    uint256 _tokenId,
    uint256 _amount,
    uint256 _startTimeStamp,
    address seller,
    bytes32 _itemId);

  event BidMade(
    address _bidder,
    uint256 _bid,
    bytes32 _itemId
  );

  event AuctionFinished(
    address _winner, 
    bytes32 _itemId
  );
    
  constructor(
    address _ryuukoAddress,
    address _satsukiAddress,
    address _yetAnotherCoinAddress
  ) {
    ryuukoAddress = _ryuukoAddress;
    satsukiAddress = _satsukiAddress;
    yetAnotherCoinAddress = _yetAnotherCoinAddress;
  }

  modifier knownToken(address _tokenAddress) {
    require((_tokenAddress == ryuukoAddress) 
      || (_tokenAddress == satsukiAddress));
    _;
  }

  function createItem(
    address _tokenAddress,
    address _account,
    uint256 _tokenId,
    uint256 _amount
  ) 
    external
    knownToken(_tokenAddress) 
{
  if (_tokenAddress == ryuukoAddress) {
    _tokenId = Ryuuko(ryuukoAddress).mintRyuuko(_account);
  } else {
    Satsuki(satsukiAddress).mintSatsuki(_account, _tokenId, _amount);
  }

  emit ItemCreated(_tokenAddress, _account, _tokenId, _amount);
}

  function listItem(
    address _tokenAddress,
    uint256 _price,
    uint256 _tokenId,
    uint256 _amount
  )
    external
    knownToken(_tokenAddress)
{
  bytes32 itemId = keccak256(abi.encodePacked(
    msg.sender,
    _tokenAddress,
    _price,
    _tokenId,
    _amount
  ));

  Item storage item = items[itemId];

  if (_tokenAddress == ryuukoAddress) {
    Ryuuko(ryuukoAddress).transferFrom(msg.sender, address(this), _tokenId);
  } else {
    Satsuki(satsukiAddress).safeTransferFrom(
      msg.sender,
      address(this),
      _tokenId,
      _amount,
      ""
    );
}

    item.price = _price;
    item.seller = msg.sender;
    item.tokenId = _tokenId;
    item.amount = _amount;
   
    emit ItemListed(
      _tokenAddress,
      msg.sender,
      _price,
      _tokenId,
      _amount,
      itemId
    );
  }

  function cancel(
    address _tokenAddress,
    bytes32 _itemId
  ) 
    external
    knownToken(_tokenAddress)
{
  Item storage item = items[_itemId];
  require(item.seller == msg.sender);

  if (_tokenAddress == ryuukoAddress) {
    Ryuuko(ryuukoAddress).transferFrom(
      address(this),
      msg.sender,
      item.tokenId
    );
  } else {
    Satsuki(satsukiAddress).safeTransferFrom(
      address(this),
      msg.sender,
      item.tokenId,
      item.amount,
      ""
    );
  }

  emit ListingCancelled(
    _tokenAddress,
    item.seller,
    item.price,
    item.tokenId,
    item.amount,
    _itemId
  );

  delete items[_itemId];
}

  function buyItem(
    address _tokenAddress,
    bytes32 _itemId
  ) 
    external
    knownToken(_tokenAddress) 
{
  Item storage item = items[_itemId];
  require(YetAnotherCoin(yetAnotherCoinAddress).balanceOf(msg.sender) 
          >= item.price);

  YetAnotherCoin(yetAnotherCoinAddress).transferFrom(
    msg.sender,
    address(this),
    item.price
  );

  if (_tokenAddress == ryuukoAddress) {
    Ryuuko(ryuukoAddress).transferFrom(
      address(this),
      msg.sender,
      item.tokenId
    );
  } else {
    Satsuki(satsukiAddress).safeTransferFrom(
      address(this),
      msg.sender,
      item.tokenId,
      item.amount,
      ""
    );
  }

  emit ItemBought(
    _tokenAddress,
    item.seller,
    item.price,
    item.tokenId,
    item.amount,
    _itemId
  );

  delete items[_itemId];
}

  function listItemOnAuction(
    address _tokenAddress,
    uint256 _initialPrice,
    uint256 _tokenId,
    uint256 _amount
  ) 
    external
{
  bytes32 itemId = keccak256(abi.encodePacked(
    msg.sender,
    _tokenAddress,
    _initialPrice,
    _tokenId,
    _amount
  ));

  Auction storage auction = auctions[itemId];

  if (_tokenAddress == ryuukoAddress) {
    Ryuuko(ryuukoAddress).transferFrom(msg.sender, address(this), _tokenId);
    auction.isRyuuko = true;
  } else {
    Satsuki(satsukiAddress).safeTransferFrom(
      msg.sender,
      address(this),
      _tokenId,
      _amount,
      ""
    );
    auction.isRyuuko = false;
  }

  auction.maxBid = _initialPrice;
  auction.tokenId = _tokenId;
  auction.amount =  _amount;
  auction.startTimeStamp = block.timestamp;
  auction.seller = msg.sender;

  emit AuctionStarted(
    auction.isRyuuko,
    auction.maxBid,
    auction.tokenId,
    auction.amount,
    auction.startTimeStamp,
    auction.seller,
    itemId
  );
}

  function makeBid(bytes32 _itemId, uint256 _bid)
    external
  {
    Auction storage auction = auctions[_itemId];

    require(
      block.timestamp <= auction.startTimeStamp + 3 days,
      "New bids no longer accepted :("
    );

    require(
      _bid > auction.maxBid,
      "New bid must be grater than the current maximum bid."
    );

    require(
      auction.bids[msg.sender] == 0,
      "You can only bid once."
    );
    
    require(
      YetAnotherCoin(yetAnotherCoinAddress).balanceOf(msg.sender) >= _bid,
      "Insufficient YAC balance."
    );

    require(
      msg.sender != auction.seller,
      "Can't bid on your own auctions."
    );

    YetAnotherCoin(yetAnotherCoinAddress).transferFrom(
      msg.sender,
      address(this),
      _bid
    );

    auction.maxBid = _bid;
    auction.bids[msg.sender] = _bid;
    auction.bidsTotal++;
    auction.bidders.push(msg.sender);
    auction.currentLeader = msg.sender;

    emit BidMade(msg.sender, _bid, _itemId);
  }

  function finishAuction(bytes32 _itemId)
    external
  {
    Auction storage auction = auctions[_itemId];

    require(
      block.timestamp > auction.startTimeStamp + 3 days,
      "The auction cannot be ended prematurely."
    );

    require(
      msg.sender == auction.seller,
      "Only auction creator can finish the auction."
    );

    address winner;

    if (auction.bidsTotal > 2) {
      winner = auction.currentLeader;
      if (auction.isRyuuko == true) {
        Ryuuko(ryuukoAddress).transferFrom(
          address(this),
          winner,
          auction.tokenId
        );
      } else {
        Satsuki(satsukiAddress).safeTransferFrom(
          address(this),
          winner,
          auction.tokenId,
          auction.amount,
          ""
        );
      }
      for (uint i = 0; i < auction.bidders.length; i++) {
        YetAnotherCoin(yetAnotherCoinAddress).transferFrom(
          address(this),
          auction.bidders[i],
          auction.bids[msg.sender]
        );
      } 
    } else {
      winner = auction.seller;
      if (auction.isRyuuko == true) {
        Ryuuko(ryuukoAddress).transferFrom(
          address(this),
          winner,
          auction.tokenId
        );
      } else {
        Satsuki(satsukiAddress).safeTransferFrom(
          address(this),
          winner,
          auction.tokenId,
          auction.amount,
          ""
        );
      }
    }
    emit AuctionFinished(winner, _itemId);
  }
}
