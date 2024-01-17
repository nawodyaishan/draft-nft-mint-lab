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
    uint256 private constant NFT_TYPE_START = 1001;
    uint256 private constant NFT_TYPE_END = 20000;
    string private baseMetadataURI;

    enum TokenType {
        IN_GAME_CURRENCY,
        EXPERIENCE_BOOST,
        PLAYER_CARD,
        STADIUM_VILLAGE_BUILDING
    }

    mapping(TokenType => uint256) private tokenTypeToId;
    mapping(TokenType => uint256) private nftSupply;

    // ------------------
    // Custom Errors
    // ------------------

    error InvalidTokenId(uint256 InvalidId);
    error InvalidFTType();
    error InvalidNFTType();
    error MaxNFTSupplyReached();
    error URIUpdateError();
    error MintingError();

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

    constructor(
        string memory _baseMetadataURI
    ) ERC1155(_baseMetadataURI) Ownable(msg.sender) {
        baseMetadataURI = _baseMetadataURI;
        tokenTypeToId[TokenType.IN_GAME_CURRENCY] = FT_TYPE_START;
        tokenTypeToId[TokenType.EXPERIENCE_BOOST] = FT_TYPE_START + 1;
        tokenTypeToId[TokenType.PLAYER_CARD] = NFT_TYPE_START;
        tokenTypeToId[TokenType.STADIUM_VILLAGE_BUILDING] =
            NFT_TYPE_START +
            10000;
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
        } else if (tokenId >= NFT_TYPE_START && tokenId <= NFT_TYPE_END) {
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
        if (!(ftType >= FT_TYPE_START && ftType <= FT_TYPE_END)) {
            revert InvalidFTType();
        }
        _mint(account, ftType, amount, data);
        emit FTMinted(account, ftType, amount);
    }

    /**
     * @dev Mints a non-fungible token.
     * @param account The address that will receive the minted NFT.
     * @param nftType The type of the NFT to be minted.
     * @param data Additional data that will be passed to the minting function.
     */
    function mintNFT(
        address account,
        uint256 nftType,
        bytes memory data
    ) public onlyOwner {
        if (!(nftType >= NFT_TYPE_START && nftType <= NFT_TYPE_END)) {
            revert InvalidNFTType();
        }
        TokenType tokenType = getTokenTypeFromId(nftType);
        uint256 currentSupply = nftSupply[tokenType];
        if (currentSupply >= 5) {
            revert MaxNFTSupplyReached();
        }
        nftSupply[tokenType] = currentSupply + 1;
        uint256 tokenId = nftType + currentSupply;
        _mint(account, tokenId, 1, data);
        emit NFTMinted(account, nftType, tokenId);
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

    /**
     * @dev Determines the token type based on a given token ID.
     * @param tokenId The ID of the token.
     * @return TokenType The type of the token.
     */
    function getTokenTypeFromId(
        uint256 tokenId
    ) public view returns (TokenType) {
        if (tokenId >= FT_TYPE_START && tokenId <= FT_TYPE_END) {
            // Iterate through FT types
            if (tokenId == tokenTypeToId[TokenType.IN_GAME_CURRENCY]) {
                return TokenType.IN_GAME_CURRENCY;
            } else if (tokenId == tokenTypeToId[TokenType.EXPERIENCE_BOOST]) {
                return TokenType.EXPERIENCE_BOOST;
            }
        } else if (tokenId >= NFT_TYPE_START && tokenId <= NFT_TYPE_END) {
            // For NFTs, determine type based on the defined range
            if (
                tokenId >= tokenTypeToId[TokenType.PLAYER_CARD] &&
                tokenId < tokenTypeToId[TokenType.PLAYER_CARD] + 10000
            ) {
                return TokenType.PLAYER_CARD;
            } else if (
                tokenId >= tokenTypeToId[TokenType.STADIUM_VILLAGE_BUILDING] &&
                tokenId <
                tokenTypeToId[TokenType.STADIUM_VILLAGE_BUILDING] + 10000
            ) {
                return TokenType.STADIUM_VILLAGE_BUILDING;
            }
        }
        revert("Invalid token ID");
    }

    // ------------------
    // Utility Functions
    // ------------------

    /**
     * @dev Returns the URI of the contract's metadata.
     * @return string The URI of the contract's collection metadata.
     */
    function contractURI() public pure returns (string memory collectionURI) {
        collectionURI = "https://turquoise-rear-loon-357.mypinata.cloud/ipfs/QmTrUpcUZQ1iCtMo6Jv9CsAhkQaM9Wo5rYmjC4h2XdAGFh/collection.json";
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
}
