// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title DraftMultiMinter
 * @dev Implementation of an ERC1155 token for a game, allowing minting of various types of tokens.
 *      This includes fungible tokens like in-game currency and non-fungible tokens like player cards.
 */
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
    // ------------------
    // Constants and State Variables
    // ------------------

    uint256 private constant FT_TYPE_START = 1;
    uint256 private constant FT_TYPE_END = 100;
    uint256 private constant NFT_TYPE_START = 1000;
    uint256 private constant NFT_TYPE_END = 20000;
    uint256 private constant PLAYER_CARD_START = 1000; // Starting from 1000 for PLAYER_CARD
    uint256 private constant STADIUM_VILLAGE_START = 10000; // Starting from 10000 for STADIUM_VILLAGE_BUILDING
    uint256 private constant MAX_NFT_SUPPLY = 5; // Maximum supply for each NFT type

    string private baseMetadataURI;

    enum TokenType {
        IN_GAME_CURRENCY,
        EXPERIENCE_BOOST,
        PLAYER_CARD,
        STADIUM_VILLAGE_BUILDING
    }

    mapping(TokenType => uint256) private nftSupply;

    // ------------------
    // Custom Errors
    // ------------------

    error InvalidTokenId(uint256 invalidId);
    error InvalidFTType(uint256 ftType);
    error InvalidNFTType(uint256 tokenType);
    error MaxNFTSupplyReached(TokenType tokenType);

    // ------------------
    // Events
    // ------------------

    event URIUpdated(string NewUri);
    event NFTMinted(address Account, uint256 NftType, uint256 NewId);
    event FTMinted(address Account, uint256 FtType, uint256 Amount);
    event NFTBatchMinted(address Account, uint256[] Ids);

    // ------------------
    // Constructor
    // ------------------

    constructor()
        ERC1155(
            "https://turquoise-rear-loon-357.mypinata.cloud/ipfs/QmahUaDqT8b4dMcibzZJzVy2edV2rTU6sKDUqcNavJEMJ7/{id}.json"
        )
        Ownable(msg.sender)
    {
        baseMetadataURI = "https://turquoise-rear-loon-357.mypinata.cloud/ipfs/QmahUaDqT8b4dMcibzZJzVy2edV2rTU6sKDUqcNavJEMJ7/";
    }

    // ------------------
    // URI Management
    // ------------------

    /**
     * @dev Sets a new base URI for the token metadata.
     * @param newUri The new base URI to be set.
     */
    function setURI(string memory newUri) public onlyOwner {
        _setURI(newUri);
        emit URIUpdated(newUri);
    }

    /**
     * @dev Returns the metadata URI for a given token ID.
     * @param tokenId The ID of the token.
     * @return string The metadata URI of the specified token ID.
     */
    function uri(uint256 tokenId) public view override returns (string memory) {
        if (tokenId >= FT_TYPE_START && tokenId <= FT_TYPE_END) {
            return
                string(
                    abi.encodePacked(
                        baseMetadataURI,
                        Strings.toString(tokenId),
                        ".json"
                    )
                );
        } else if (
            (tokenId >= PLAYER_CARD_START &&
                tokenId < PLAYER_CARD_START + MAX_NFT_SUPPLY) ||
            (tokenId >= STADIUM_VILLAGE_START &&
                tokenId < STADIUM_VILLAGE_START + MAX_NFT_SUPPLY)
        ) {
            return
                string(
                    abi.encodePacked(
                        baseMetadataURI,
                        Strings.toString(tokenId),
                        ".json"
                    )
                );
        }
        revert InvalidTokenId(tokenId);
    }

    // ------------------
    // Token Minting
    // ------------------

    /**
     * @dev Mints fungible tokens.
     * @param account The address that will receive the minted tokens.
     * @param ftType The type of the fungible token to be minted.
     * @param amount The amount of tokens to be minted.
     * @param data Additional data that will be passed to the minting function.
     */
    function mintFT(
        address account,
        uint256 ftType,
        uint256 amount,
        bytes memory data
    ) public onlyOwner {
        if (ftType != 1 && ftType != 2) {
            revert InvalidFTType(ftType);
        }
        _mint(account, ftType, amount, data);
        emit FTMinted(account, ftType, amount);
    }

    /**
     * @dev Mints a non-fungible token.
     * @param account The address that will receive the minted NFT.
     * @param tokenType The type of the NFT to be minted.
     * @param data Additional data that will be passed to the minting function.
     */
    function mintNFT(
        address account,
        uint256 tokenType,
        bytes memory data
    ) public onlyOwner {
        if (tokenType != 3 && tokenType != 4) {
            revert InvalidNFTType(tokenType);
        }
        TokenType typeEnum = TokenType(tokenType - 1);
        uint256 currentSupply = nftSupply[typeEnum];
        if (currentSupply >= MAX_NFT_SUPPLY) {
            revert MaxNFTSupplyReached(typeEnum);
        }
        uint256 tokenId = (
            tokenType == 3 ? PLAYER_CARD_START : STADIUM_VILLAGE_START
        ) + currentSupply;
        nftSupply[typeEnum] = currentSupply + 1;
        _mint(account, tokenId, 1, data);
        emit NFTMinted(account, tokenId, 1);
    }

    /**
     * @dev Determines the token type based on a given token ID.
     * @param tokenId The ID of the token.
     * @return TokenType The type of the token.
     */
    function getTokenTypeFromId(
        uint256 tokenId
    ) public pure returns (TokenType) {
        if (tokenId == 1 || tokenId == 2) {
            return TokenType(tokenId - 1);
        } else if (
            tokenId >= PLAYER_CARD_START &&
            tokenId < PLAYER_CARD_START + MAX_NFT_SUPPLY
        ) {
            return TokenType.PLAYER_CARD;
        } else if (
            tokenId >= STADIUM_VILLAGE_START &&
            tokenId < STADIUM_VILLAGE_START + MAX_NFT_SUPPLY
        ) {
            return TokenType.STADIUM_VILLAGE_BUILDING;
        }
        revert InvalidTokenId(tokenId);
    }

    /**
     * @dev Pauses all token transfers.
     */
    function pause() public onlyOwner {
        _pause();
    }

    /**
     * @dev Unpauses all token transfers.
     */
    function unpause() public onlyOwner {
        _unpause();
    }

    // ------------------
    // Utility Functions
    // ------------------

    /*
     * @dev Returns the URI of the contract's metadata.
     * @return string The URI of the contract's collection metadata.
     */
    function contractURI() public pure returns (string memory collectionURI) {
        collectionURI = "https://turquoise-rear-loon-357.mypinata.cloud/ipfs/QmahUaDqT8b4dMcibzZJzVy2edV2rTU6sKDUqcNavJEMJ7/collection.json";
    }

    // ------------------
    // overrides
    // ------------------

    /**
     * @dev Internal function to update the state on token transfers.
     * @param from Address tokens are transferred from.
     * @param to Address tokens are transferred to.
     * @param ids Array of token IDs being transferred.
     * @param values Array of amounts of tokens being transferred.
     */
    function _update(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values
    ) internal override(ERC1155, ERC1155Supply, ERC1155Pausable) {
        super._update(from, to, ids, values);
    }

    // ------------------
    // Getter Functions
    // ------------------

    /**
     * @dev Gets the current supply for a given NFT type.
     * @param tokenType The TokenType for which to get the supply.
     * @return uint256 The current supply of the given NFT type.
     */
    function getCurrentNFTSupply(
        TokenType tokenType
    ) public view returns (uint256) {
        require(
            tokenType == TokenType.PLAYER_CARD ||
                tokenType == TokenType.STADIUM_VILLAGE_BUILDING,
            "Invalid NFT Type"
        );
        return nftSupply[tokenType];
    }

    /**
     * @dev Checks if a given token ID is a fungible token.
     * @param tokenId The ID of the token to check.
     * @return bool True if the token is a fungible token, false otherwise.
     */
    function isFungibleToken(uint256 tokenId) public pure returns (bool) {
        return tokenId >= FT_TYPE_START && tokenId <= FT_TYPE_END;
    }

    /**
     * @dev Checks if a given token ID is a non-fungible token.
     * @param tokenId The ID of the token to check.
     * @return bool True if the token is a non-fungible token, false otherwise.
     */
    function isNonFungibleToken(uint256 tokenId) public pure returns (bool) {
        return tokenId >= NFT_TYPE_START && tokenId <= NFT_TYPE_END;
    }
}
