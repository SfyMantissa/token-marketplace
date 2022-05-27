# Marketplace









## Methods

### buyItem

```solidity
function buyItem(uint256 itemId) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| itemId | uint256 | undefined |

### cancel

```solidity
function cancel(uint256 itemId) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| itemId | uint256 | undefined |

### createItem

```solidity
function createItem(address account) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| account | address | undefined |

### finishAuction

```solidity
function finishAuction() external pure
```






### items

```solidity
function items(uint256) external view returns (uint256 price, uint256 tokenId, address seller, address buyer, bool isBought)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| price | uint256 | undefined |
| tokenId | uint256 | undefined |
| seller | address | undefined |
| buyer | address | undefined |
| isBought | bool | undefined |

### listItem

```solidity
function listItem(uint256 tokenId, uint256 price) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenId | uint256 | undefined |
| price | uint256 | undefined |

### listItemOnAuction

```solidity
function listItemOnAuction() external pure
```






### makeBid

```solidity
function makeBid() external pure
```






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

### yetAnotherCoinAddress

```solidity
function yetAnotherCoinAddress() external view returns (address)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |




