// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract DraftMultiMinter is
ERC1155,
Ownable,
ERC1155Pausable,
ERC1155Burnable,
ERC1155Supply
{
    // Constants for token IDs
    uint256 public constant IN_GAME_CURRENCY = 1; // FT
    uint256 public constant EXPERIENCE_BOOST = 2; // FT
    uint256 public constant PLAYER_CARD = 3; // NFT
    uint256 public constant STADIUM_VILLAGE_BUILDING = 4; // NFT

    // Metadata URI
    string private s_baseMetadataURI;

    mapping(uint256 => uint256) private m_lastIssuedId;

    error OutOfNFTSupply(uint256 requestedNFTType, uint256 maxSupply);

    constructor(
        string memory baseMetadataURI
    ) ERC1155(baseMetadataURI) Ownable(msg.sender) {
        s_baseMetadataURI = baseMetadataURI;

        // Initialize the last issued ID for each NFT type
        m_lastIssuedId[PLAYER_CARD] = 0;
        m_lastIssuedId[STADIUM_VILLAGE_BUILDING] = 0;
    }

    function setURI(string memory newUri) public onlyOwner {
        s_baseMetadataURI = newUri;
        _setURI(newUri);
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        if (tokenId == PLAYER_CARD) {
            return
                string(
                abi.encodePacked(
                    s_baseMetadataURI,
                    "p-",
                    Strings.toString(tokenId),
                    ".json"
                )
            );
        } else if (tokenId == STADIUM_VILLAGE_BUILDING) {
            return
                string(
                abi.encodePacked(
                    s_baseMetadataURI,
                    "sb-",
                    Strings.toString(tokenId),
                    ".json"
                )
            );
        } else {
            return
                string(
                abi.encodePacked(
                    s_baseMetadataURI,
                    Strings.toString(tokenId),
                    ".json"
                )
            );
        }
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    // Minting function for a single NFT
    function mintNFT(
        address account,
        uint256 nftType,
        bytes memory data
    ) public onlyOwner {
        require(
            nftType == PLAYER_CARD || nftType == STADIUM_VILLAGE_BUILDING,
            "Invalid NFT Type"
        );

        if (m_lastIssuedId[nftType] >= 5) {
            revert OutOfNFTSupply(nftType, 5);
        }

        uint256 newId = ++m_lastIssuedId[nftType]; // Increment and get the new ID
        _mint(account, newId, 1, data); // Mint the NFT with the new ID
    }

    // Minting batch function for NFTs
    function mintNFTBatch(
        address account,
        uint256[] memory ids,
        bytes memory data
    ) public onlyOwner {
        uint256[] memory amounts = new uint256[](ids.length);

        for (uint256 i = 0; i < ids.length; i++) {
            require(
                ids[i] == PLAYER_CARD || ids[i] == STADIUM_VILLAGE_BUILDING,
                "Invalid NFT ID"
            );
            amounts[i] = 1; // Set the amount for each NFT to 1
        }
        _mintBatch(account, ids, amounts, data);
    }

    function _update(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values
    ) internal override(ERC1155, ERC1155Supply, ERC1155Pausable) {
        super._update(from, to, ids, values);
    }
}
