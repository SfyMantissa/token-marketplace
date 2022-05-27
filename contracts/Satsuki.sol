// SPDX-License-Identifier: UNLICENCED

pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/// @title A ERC-1155 compliant token for the marketplace project.
/// @author Sfy Mantissa
contract Satsuki is ERC1155, AccessControl {

  /// @dev A special variable for use by the AccessControl module.
  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

  /// @dev A string with the IPFS location of token assets.
  string public ipfsString;

  /// @dev Name of the collection (assigned to correctly display on OpenSea).
  string public name = "Satsuki";

  /// @dev First collection.
  uint256 public constant SATSUKI_1 = 1;

  /// @dev Second collection.
  uint256 public constant SATSUKI_2 = 2;

  /// @dev Third collection.
  uint256 public constant SATSUKI_3 = 3;

  constructor
  (
    string memory _ipfsString
  ) 
  ERC1155(string(abi.encodePacked(_ipfsString,"{id}.json")))
  {
    ipfsString = _ipfsString;
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _setupRole(MINTER_ROLE, msg.sender);
    _mint(msg.sender, SATSUKI_1, 1, "");
    _mint(msg.sender, SATSUKI_2, 1, "");
    _mint(msg.sender, SATSUKI_3, 1, "");
  }

  /// @notice Mint `amount` of tokens from `id` collection to the `account`.
  /// @dev Set data to empty string (seems redundant for now).
  /// @param account The recepient account address.
  /// @param id ID of the collection.
  /// @param amount Quantity of tokens to be minted.
  function mintSatsuki
  (
    address account,
    uint256 id,
    uint256 amount
  )
    public
    onlyRole(MINTER_ROLE)
  {
    _mint(account, id, amount, "");
  }

  /// @notice Sets NFT matadata (e.g. for OpenSea).
  /// @param _tokenId Token's ID.
  /// @return A string with NFT metadata. 
  function uri(uint256 _tokenId)
    override
    public
    view
    returns (string memory) 
  {
    return string(
      abi.encodePacked(
          ipfsString,Strings.toString(_tokenId),".json"
      )
    );
  }

  /// @dev Used to resolve the conflict when inheriting from both
  ///      AccessControl and ERC1155.
  function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC1155, AccessControl)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }

}
