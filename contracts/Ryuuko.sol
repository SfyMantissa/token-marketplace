// SPDX-License-Identifier: UNLICENCED

pragma solidity ^0.8.8;

import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/// @title A ERC-721 compliant token for the marketplace project.
/// @author Sfy Mantissa
contract Ryuuko is ERC721, AccessControl {

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  /// @dev A special variable for use by the AccessControl module.
  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

  /// @dev Full name of the character for NFT metadata.
  string public fullName;

  /// @dev Link to the character image stored in the IPFS.
  string public ipfsCID;

  constructor
  (
    string memory _fullName,
    string memory _ipfsCID
  ) 
  ERC721("Ryuuko", "RKO")
  {
    fullName = _fullName;
    ipfsCID = _ipfsCID;
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _setupRole(MINTER_ROLE, msg.sender);
    mintRyuuko(msg.sender);
  }

  /// @notice Mints a Ryuuko token to the given `account`.
  /// @param account Recepient's address
  function mintRyuuko(address account)
    public
    onlyRole(MINTER_ROLE)
    returns (uint256)
  {
    _tokenIds.increment();
    uint256 newItemId = _tokenIds.current();
    _safeMint(account, newItemId);

    return newItemId;
  }

  /// @notice Sets NFT matadata (e.g. for OpenSea).
  /// @dev IMPORTANT: metadata is stored on chain here because I want to make
  ///      it dynamic in the future (e.g. with Chainlink VRF).
  /// @param _tokenId Token's ID.
  /// @return A string with NFT metadata. 
  function tokenURI(uint256 _tokenId)
    public
    view
    override
    returns (string memory)
  {
    string memory json = Base64.encode(
      abi.encodePacked(
        '{ "name": "',
        fullName,
        ' -- NFT #: ',
        Strings.toString(_tokenId),
        '", "description": "ERC-721 Matoi Ryuuko NFT.", "image": "ipfs://',
        ipfsCID, '" }'
      )
    );

    string memory formattedJson = string(
      abi.encodePacked("data:application/json;base64,", json)
    );

    return formattedJson;
  }    

  /// @dev Used to resolve the conflict when inheriting from both
  ///      AccessControl and ERC721.
  function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721, AccessControl)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }

}
