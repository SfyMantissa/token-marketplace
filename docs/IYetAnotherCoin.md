# IYetAnotherCoin

*Sfy Mantissa*

> A simple ERC-20-compliant token I made to better understand the         ERC-20 standard.





## Methods

### allowance

```solidity
function allowance(address account, address delegate) external view returns (uint256)
```

Get the allowance provided by the account to delegate.



#### Parameters

| Name | Type | Description |
|---|---|---|
| account | address | Address of the account. |
| delegate | address | Address of the delegate. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### approve

```solidity
function approve(address delegate, uint256 amount) external nonpayable returns (bool)
```

Allows the caller to delegate spending the specified `amount`         of tokens from caller&#39;s wallet by the `delegate`.



#### Parameters

| Name | Type | Description |
|---|---|---|
| delegate | address | Address of the delegate. |
| amount | uint256 | Number of tokens to be allowed for transfer. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Flag to tell whether the call succeeded. |

### balanceOf

```solidity
function balanceOf(address account) external view returns (uint256)
```

Get token `balance` of the `account`.



#### Parameters

| Name | Type | Description |
|---|---|---|
| account | address | Address of the account. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### burn

```solidity
function burn(address account, uint256 amount) external nonpayable returns (bool)
```

Allows the caller to burn the specified `amount` of tokens         from the `account` and decrease the `totalSupply          by the `amount`.



#### Parameters

| Name | Type | Description |
|---|---|---|
| account | address | Address of the burned account. |
| amount | uint256 | Number of tokens to be burned. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### decimals

```solidity
function decimals() external view returns (uint8)
```

Get token&#39;s decimals for end-user representation.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint8 | undefined |

### mint

```solidity
function mint(address account, uint256 amount) external nonpayable returns (bool)
```

Allows the caller to give the specified `amount` of tokens         to the `account` and increase `totalSupply` by the `amount`.



#### Parameters

| Name | Type | Description |
|---|---|---|
| account | address | Address of the recepient. |
| amount | uint256 | Number of tokens to be transferred. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### name

```solidity
function name() external view returns (string)
```

Get token&#39;s human-readable name.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | string | undefined |

### symbol

```solidity
function symbol() external view returns (string)
```

Get token&#39;s acronym representation.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | string | undefined |

### totalSupply

```solidity
function totalSupply() external view returns (uint256)
```

Get token&#39;s total supply.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### transfer

```solidity
function transfer(address buyer, uint256 amount) external nonpayable returns (bool)
```

Allows to transfer a specified `amount` of tokens between         the caller and the `buyer`



#### Parameters

| Name | Type | Description |
|---|---|---|
| buyer | address | Address of the recepient. |
| amount | uint256 | Number of tokens to be transferred. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Flag to tell whether the call succeeded. |

### transferFrom

```solidity
function transferFrom(address seller, address buyer, uint256 amount) external nonpayable returns (bool)
```

Allows to transfer a specified `amount` of tokens on behalf         of `seller` by the delegate.

*Delegate must have enough allowance.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| seller | address | Address of the wallet to withdraw tokens from. |
| buyer | address | Address of the recepient. |
| amount | uint256 | Number of tokens to be transferred. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Flag to tell whether the call succeeded. |



## Events

### Approval

```solidity
event Approval(address indexed owner, address indexed delegate, uint256 amount)
```

Gets triggeted upon a successful approve() call.



#### Parameters

| Name | Type | Description |
|---|---|---|
| owner `indexed` | address | undefined |
| delegate `indexed` | address | undefined |
| amount  | uint256 | undefined |

### Transfer

```solidity
event Transfer(address indexed seller, address indexed buyer, uint256 amount)
```

Gets triggered upon any action where tokens are moved         between accounts: transfer(), transferFrom(), mint(), burn().



#### Parameters

| Name | Type | Description |
|---|---|---|
| seller `indexed` | address | undefined |
| buyer `indexed` | address | undefined |
| amount  | uint256 | undefined |



