# Token Marketplace 💰

A mock ERC-721/ERC-1155 marketplace.

## Features

This project includes 4 separate contracts:

  - Ryuuko.sol — a mock ERC-721 token.
  - Satsuki.sol — a mock ERC-1155 token.
  - YetAnotherCoin.sol — a ERC-20 token which is used to pay in the marketplace, [taken from my previous project.](https://github.com/SfyMantissa/YetAnotherCoin)
  - Marketplace.sol — the marketplace contract itself.

Marketplace is allowed to mint Ryuuko and Satsuki tokens using [OpenZeppelin Access Control.](https://docs.openzeppelin.com/contracts/4.x/access-control)

- Ryuuko token:
  - [x] Deployed @0xD9e081D9186d4075C8D9F07bDF3E33CF46fd6ab6 in Rinkeby testnet.
  - [x] Available on OpenSea and [Rarible.](https://rinkeby.rarible.com/collection/0xd9e081d9186d4075c8d9f07bdf3e33cf46fd6ab6/items) 
  - [x] Verified on [Etherscan.](https://rinkeby.etherscan.io/address/0xD9e081D9186d4075C8D9F07bDF3E33CF46fd6ab6#code)
  - [x] Fully covered with tests (located in _test/ryuuko-test.ts_).
  - [x] Fully covered with tasks (located in _tasks/ryuuko/_).
  - [x] All ABI interfaces are covered by NatSpec annotations.
  - [x] Generated comprehensive Markdown documentation (located in _docs/Ryuuko.md_).

- Satsuki token: 
  - [x] Deployed @0xbb57dAB3E39828C4A75F88eEc3a9942A5cc74B5F in Rinkeby testnet.
  - [x] Available on OpenSea and [Rarible.](https://rinkeby.rarible.com/collection/0xbb57dab3e39828c4a75f88eec3a9942a5cc74b5f/items)
  - [x] Verified on [Etherscan.](https://rinkeby.etherscan.io/address/0xbb57dAB3E39828C4A75F88eEc3a9942A5cc74B5F#code)
  - [x] Fully covered with tests (located in _test/satsuki-test.ts_).
  - [x] Fully covered with tasks (located in _tasks/satsuki/_).
  - [x] All ABI interfaces are covered by NatSpec annotations.
  - [x] Generated comprehensive Markdown documentation (located in _docs/Satsuki.md_).

- YetAnotherCoin token:
  - [x] Deployed @0xB89F9f4Da44E29D8A60dC97038E220E3f7642C42 in Rinkeby testnet.
  - [x] Verified on [Etherscan.](https://rinkeby.etherscan.io/address/0xB89F9f4Da44E29D8A60dC97038E220E3f7642C42#code)
  - [x] Fully covered with tests (located in _test/yet-another-coin-test.ts_).
  - [x] All ABI interfaces are covered by NatSpec annotations.
  - [x] Generated comprehensive Markdown documentation (located in _docs/YetAnotherCoin.md_).

## Usage

TODO

## Demonstration

TODO
