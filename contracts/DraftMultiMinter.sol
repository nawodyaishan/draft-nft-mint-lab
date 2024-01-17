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
    // Token ID constants
    uint256 public constant IN_GAME_CURRENCY = 1; // Fungible token
    uint256 public constant EXPERIENCE_BOOST = 2; // Fungible token
    uint256 public constant PLAYER_CARD = 3; // Non-fungible token
    uint256 public constant STADIUM_VILLAGE_BUILDING = 4; // Non-fungible token

    // Mapping to track the last issued ID for each NFT type
    mapping(uint256 => uint256) private m_lastIssuedId;

    // Custom errors
    error OutOfNFTSupply(uint256 requestedNFTType, uint256 maxSupply);
    error InvalidNFTType(uint256 invalidType);
    error InvalidNFTID(uint256 invalidID);
    error MaxNFTSupplyExceeded(uint256 nftType, uint256 maxSupply);
    error URIUpdateError();
    error MintingError(string reason);

    // Events
    event URIUpdated(string newUri);
    event NFTMinted(
        address indexed account,
        uint256 indexed nftType,
        uint256 newId
    );
    event FTMinted(
        address indexed account,
        uint256 indexed nftType,
        uint256 newId
    );
    event NFTBatchMinted(address indexed account, uint256[] ids);

    /*
     * @dev Sets the base URI for token metadata and initializes state.
     * @param baseMetadataURI Initial base URI for token metadata.
     */
    constructor()
    ERC1155(
    "https://turquoise-rear-loon-357.mypinata.cloud/ipfs/QmTrUpcUZQ1iCtMo6Jv9CsAhkQaM9Wo5rYmjC4h2XdAGFh/{id}.json"
    )
    Ownable(msg.sender)
    {
        m_lastIssuedId[PLAYER_CARD] = 0;
        m_lastIssuedId[STADIUM_VILLAGE_BUILDING] = 0;
    }

    /**
     * @dev Updates the base URI for token metadata.
     * @param newUri New base URI to set.
     */
    function setURI(string memory newUri) public onlyOwner {
        _setURI(newUri);
        emit URIUpdated(newUri);
    }

    /**
     * @dev Returns the URI for a given token ID.
     * @param tokenId The ID of the token to return the URI for.
     * @return string URI of the given token ID.
     */
    function uri(uint256 tokenId) public pure override returns (string memory) {
        // Check if the tokenId is for a player card
        if (tokenId >= PLAYER_CARD && tokenId < PLAYER_CARD + 5) {
            return
                string(
                abi.encodePacked(
                    "https://turquoise-rear-loon-357.mypinata.cloud/ipfs/QmTrUpcUZQ1iCtMo6Jv9CsAhkQaM9Wo5rYmjC4h2XdAGFh/p-",
                    Strings.toString(tokenId - PLAYER_CARD + 1),
                    ".json"
                )
            );
        }
            // Check if the tokenId is for a stadium village building
        else if (
            tokenId >= STADIUM_VILLAGE_BUILDING &&
            tokenId < STADIUM_VILLAGE_BUILDING + 5
        ) {
            return
                string(
                abi.encodePacked(
                    "https://turquoise-rear-loon-357.mypinata.cloud/ipfs/QmTrUpcUZQ1iCtMo6Jv9CsAhkQaM9Wo5rYmjC4h2XdAGFh/sb-",
                    Strings.toString(
                        tokenId - STADIUM_VILLAGE_BUILDING + 1
                    ),
                    ".json"
                )
            );
        } else {
            return
                string(
                abi.encodePacked(
                    "https://turquoise-rear-loon-357.mypinata.cloud/ipfs/QmTrUpcUZQ1iCtMo6Jv9CsAhkQaM9Wo5rYmjC4h2XdAGFh/",
                    Strings.toString(tokenId),
                    ".json"
                )
            );
        }
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
     * @dev Mints fungible tokens (FTs).
     * @notice This function allows minting of specified fungible token types.
     * @param account The address to receive the minted tokens.
     * @param ftType The type of the fungible token to mint.
     * @param amount The amount of the fungible tokens to mint.
     * @param data Additional data with no specified format, sent in call to `_mint`.
     */
    function mintFT(
        address account,
        uint256 ftType,
        uint256 amount,
        bytes memory data
    ) public onlyOwner {
        // Check if the token type is valid for FTs
        require(
            ftType == IN_GAME_CURRENCY || ftType == EXPERIENCE_BOOST,
            "Invalid FT Type"
        );

        // Perform the minting of fungible tokens
        _mint(account, ftType, amount, data);

        // Emit an event for minting FTs (optional, can be customized or removed)
        emit FTMinted(account, ftType, amount);
    }

    /**
     * @dev Mints a single new NFT.
     * @param account Address of the NFT recipient.
     * @param nftType Type of the NFT to mint.
     * @param data Additional data with no specified format, sent in call to `_mint`.
     */
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
            revert MaxNFTSupplyExceeded(nftType, 5);
        }

        uint256 newId = m_lastIssuedId[nftType] + 1;
        m_lastIssuedId[nftType] = newId;
        _mint(account, nftType + newId - 1, 1, data);
        emit NFTMinted(account, nftType, newId);
    }

    /**
     * @dev Mints a batch of new NFTs.
     * @param account Address of the NFT recipient.
     * @param ids Array of NFT types to mint.
     * @param data Additional data with no specified format, sent in call to `_mintBatch`.
     */
    function mintNFTBatch(
        address account,
        uint256[] memory ids,
        bytes memory data
    ) public onlyOwner {
        uint256[] memory amounts = new uint256[](ids.length);

        for (uint256 i = 0; i < ids.length; i++) {
            if (ids[i] != PLAYER_CARD && ids[i] != STADIUM_VILLAGE_BUILDING) {
                revert InvalidNFTID(ids[i]);
            }
            amounts[i] = 1;
        }
        _mintBatch(account, ids, amounts, data);
        emit NFTBatchMinted(account, ids);
    }

    function airDropFT(
        uint256 tokenId,
        address[] calldata recipients,
        uint256 amount
    ) external onlyOwner {
        // Check if the token type is valid for FTs
        require(
            tokenId == IN_GAME_CURRENCY || tokenId == EXPERIENCE_BOOST,
            "Invalid FT Type"
        );
        for (uint i = 0; i < recipients.length; i++) {
            _safeTransferFrom(msg.sender, recipients[i], tokenId, amount, "");
        }
    }

    function contractURI() public pure returns (string memory collectionURI) {
        collectionURI = "https://turquoise-rear-loon-357.mypinata.cloud/ipfs/QmTrUpcUZQ1iCtMo6Jv9CsAhkQaM9Wo5rYmjC4h2XdAGFh/collection.json";
    }

    // ------------------
    // Explicit overrides
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
