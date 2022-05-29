# Marketplace









## Methods

### auctions

```solidity
function auctions(bytes32) external view returns (uint256 maxBid, uint256 tokenId, uint256 amount, uint256 bidsTotal, uint256 startTimeStamp, address seller, address currentLeader, bool isRyuuko)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| maxBid | uint256 | undefined |
| tokenId | uint256 | undefined |
| amount | uint256 | undefined |
| bidsTotal | uint256 | undefined |
| startTimeStamp | uint256 | undefined |
| seller | address | undefined |
| currentLeader | address | undefined |
| isRyuuko | bool | undefined |

### buyItem

```solidity
function buyItem(address _tokenAddress, bytes32 _itemId) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tokenAddress | address | undefined |
| _itemId | bytes32 | undefined |

### cancel

```solidity
function cancel(address _tokenAddress, bytes32 _itemId) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tokenAddress | address | undefined |
| _itemId | bytes32 | undefined |

### createItem

```solidity
function createItem(address _tokenAddress, address _account, uint256 _tokenId, uint256 _amount) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tokenAddress | address | undefined |
| _account | address | undefined |
| _tokenId | uint256 | undefined |
| _amount | uint256 | undefined |

### finishAuction

```solidity
function finishAuction(bytes32 _itemId) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _itemId | bytes32 | undefined |

### items

```solidity
function items(bytes32) external view returns (uint256 price, uint256 tokenId, uint256 amount, address seller)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| price | uint256 | undefined |
| tokenId | uint256 | undefined |
| amount | uint256 | undefined |
| seller | address | undefined |

### listItem

```solidity
function listItem(address _tokenAddress, uint256 _price, uint256 _tokenId, uint256 _amount) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tokenAddress | address | undefined |
| _price | uint256 | undefined |
| _tokenId | uint256 | undefined |
| _amount | uint256 | undefined |

### listItemOnAuction

```solidity
function listItemOnAuction(address _tokenAddress, uint256 _initialPrice, uint256 _tokenId, uint256 _amount) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tokenAddress | address | undefined |
| _initialPrice | uint256 | undefined |
| _tokenId | uint256 | undefined |
| _amount | uint256 | undefined |

### makeBid

```solidity
function makeBid(bytes32 _itemId, uint256 _bid) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _itemId | bytes32 | undefined |
| _bid | uint256 | undefined |

### onERC1155BatchReceived

```solidity
function onERC1155BatchReceived(address, address, uint256[], uint256[], bytes) external nonpayable returns (bytes4)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |
| _1 | address | undefined |
| _2 | uint256[] | undefined |
| _3 | uint256[] | undefined |
| _4 | bytes | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes4 | undefined |

### onERC1155Received

```solidity
function onERC1155Received(address, address, uint256, uint256, bytes) external nonpayable returns (bytes4)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |
| _1 | address | undefined |
| _2 | uint256 | undefined |
| _3 | uint256 | undefined |
| _4 | bytes | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes4 | undefined |

### ryuukoAddress

```solidity
function ryuukoAddress() external view returns (address)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

### satsukiAddress

```solidity
function satsukiAddress() external view returns (address)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) external view returns (bool)
```



*See {IERC165-supportsInterface}.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| interfaceId | bytes4 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### yetAnotherCoinAddress

```solidity
function yetAnotherCoinAddress() external view returns (address)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |



## Events

### AuctionFinished

```solidity
event AuctionFinished(address _winner, bytes32 _itemId)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _winner  | address | undefined |
| _itemId  | bytes32 | undefined |

### AuctionStarted

```solidity
event AuctionStarted(bool _isRyuuko, uint256 _maxBid, uint256 _tokenId, uint256 _amount, uint256 _startTimeStamp, address seller, bytes32 _itemId)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _isRyuuko  | bool | undefined |
| _maxBid  | uint256 | undefined |
| _tokenId  | uint256 | undefined |
| _amount  | uint256 | undefined |
| _startTimeStamp  | uint256 | undefined |
| seller  | address | undefined |
| _itemId  | bytes32 | undefined |

### BidMade

```solidity
event BidMade(address _bidder, uint256 _bid, bytes32 _itemId)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _bidder  | address | undefined |
| _bid  | uint256 | undefined |
| _itemId  | bytes32 | undefined |

### ItemBought

```solidity
event ItemBought(address _tokenAddress, address _seller, uint256 _price, uint256 _tokenId, uint256 _amount, bytes32 _itemId)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tokenAddress  | address | undefined |
| _seller  | address | undefined |
| _price  | uint256 | undefined |
| _tokenId  | uint256 | undefined |
| _amount  | uint256 | undefined |
| _itemId  | bytes32 | undefined |

### ItemCreated

```solidity
event ItemCreated(address _tokenAddress, address _account, uint256 _tokenId, uint256 _amount)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tokenAddress  | address | undefined |
| _account  | address | undefined |
| _tokenId  | uint256 | undefined |
| _amount  | uint256 | undefined |

### ItemListed

```solidity
event ItemListed(address _tokenAddress, address _seller, uint256 _price, uint256 _tokenId, uint256 _amount, bytes32 _itemId)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tokenAddress  | address | undefined |
| _seller  | address | undefined |
| _price  | uint256 | undefined |
| _tokenId  | uint256 | undefined |
| _amount  | uint256 | undefined |
| _itemId  | bytes32 | undefined |

### ListingCancelled

```solidity
event ListingCancelled(address _tokenAddress, address _seller, uint256 _price, uint256 _tokenId, uint256 _amount, bytes32 _itemId)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tokenAddress  | address | undefined |
| _seller  | address | undefined |
| _price  | uint256 | undefined |
| _tokenId  | uint256 | undefined |
| _amount  | uint256 | undefined |
| _itemId  | bytes32 | undefined |



