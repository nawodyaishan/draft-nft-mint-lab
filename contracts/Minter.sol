// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Minter contract
 */
contract Minter is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    string public PROVENANCE_HASH = "";
    uint256 public MAX_NFTS;
    uint256 public OFFSET_VALUE;
    bool public METADATA_FROZEN;
    bool public PROVENANCE_FROZEN;

    string public baseUri;
    bool public saleIsActive;
    uint256 public mintPrice;
    uint256 public presaleMintPrice;
    uint256 public maxPerMint;
    uint256 public maxPerWallet;

    event SetBaseUri(string indexed baseUri);

    modifier whenMetadataNotFrozen() {
        require(!METADATA_FROZEN, "Minter: Metadata already frozen.");
        _;
    }

    modifier whenProvenanceNotFrozen() {
        require(!PROVENANCE_FROZEN, "Minter: Provenance already frozen.");
        _;
    }

    constructor() ERC721("Minter", "MINTER") {
        baseUri = "ipfs://ipfs link for collection/";
        saleIsActive = false;
        MAX_NFTS = 500;
        maxPerWallet = 0;
        // 0.1 ETH
        mintPrice = 100_000_000_000_000_000;
        // 0.05 ETH
        presaleMintPrice = 0;
        maxPerMint = 20;
        METADATA_FROZEN = false;
        PROVENANCE_FROZEN = false;
    }

    // ------------------
    // Explicit overrides
    // ------------------

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(
        uint256 tokenId
    ) internal virtual override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    )
    public
    view
    virtual
    override(ERC721URIStorage, ERC721)
    returns (string memory)
    {
        return string(abi.encodePacked(super.tokenURI(tokenId), ".json"));
    }

    function _baseURI() internal view override returns (string memory) {
        return baseUri;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721Enumerable, ERC721) returns (bool) {
        return
            interfaceId == type(IERC721Enumerable).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    // ------------------
    // Utility view functions
    // ------------------

    function exists(uint256 _tokenId) public view returns (bool) {
        return _exists(_tokenId);
    }

    function maxSupply() external view returns (uint256) {
        return MAX_NFTS;
    }

    function remainingSupply() external view returns (uint256) {
        return MAX_NFTS - totalSupply();
    }

    // ------------------
    // Functions for external minting
    // ------------------

    function mint(address account, uint256 amount) external payable {
        require(amount <= maxPerMint, "Minter: Amount exceeds max per mint");
        require(
            totalSupply() + amount <= MAX_NFTS,
            "Minter: Purchase would exceed cap"
        );
        require(
            maxPerWallet <= 0 || balanceOf(account) + amount <= maxPerWallet,
            "Minter: Maximum mints per wallet is exceeded"
        );
        require(
            (saleIsActive ? mintPrice : presaleMintPrice) * amount <= msg.value,
            "Minter: Ether value sent is not correct"
        );

        for (uint256 i = 0; i < amount; i++) {
            uint256 mintIndex = totalSupply() + 1;
            if (totalSupply() < MAX_NFTS) {
                _safeMint(account, mintIndex);
            }
        }
    }

    function setMaxPerMint(uint256 _maxPerMint) external onlyOwner {
        maxPerMint = _maxPerMint;
    }

    function setMaxPerWallet(uint256 _maxPerWallet) external onlyOwner {
        maxPerWallet = _maxPerWallet;
    }

    function setMintPrice(uint256 _mintPrice) external onlyOwner {
        mintPrice = _mintPrice;
    }

    function setPresaleMintPrice(uint256 _mintPrice) external onlyOwner {
        presaleMintPrice = _mintPrice;
    }

    function setBaseUri(
        string memory _baseUri
    ) external onlyOwner whenMetadataNotFrozen {
        baseUri = _baseUri;
        emit SetBaseUri(baseUri);
    }

    function setTokenURI(
        uint256 tokenId,
        string memory _tokenURI
    ) external onlyOwner whenMetadataNotFrozen {
        super._setTokenURI(tokenId, _tokenURI);
    }

    function mintForCommunity(
        address _to,
        uint256 _numberOfTokens
    ) external onlyOwner {
        require(_to != address(0), "Minter: Cannot mint to zero address.");
        require(
            totalSupply() + _numberOfTokens <= MAX_NFTS,
            "Minter: Minting would exceed cap"
        );
        for (uint256 i = 0; i < _numberOfTokens; i++) {
            uint256 mintIndex = totalSupply() + 1;
            if (totalSupply() < MAX_NFTS) {
                _safeMint(_to, mintIndex);
            }
        }
    }

    function setProvenanceHash(
        string memory _provenanceHash
    ) external onlyOwner whenProvenanceNotFrozen {
        PROVENANCE_HASH = _provenanceHash;
    }

    function setOffsetValue(uint256 _offsetValue) external onlyOwner {
        OFFSET_VALUE = _offsetValue;
    }

    function toggleSaleState() external onlyOwner {
        saleIsActive = !saleIsActive;
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }

    function freezeMetadata() external onlyOwner whenMetadataNotFrozen {
        METADATA_FROZEN = true;
    }

    function freezeProvenance() external onlyOwner whenProvenanceNotFrozen {
        PROVENANCE_FROZEN = true;
    }

    // ------------------
    // Utility function for getting the tokens of a certain address
    // ------------------

    function tokensOfOwner(
        address _owner
    ) external view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(_owner);
        if (tokenCount == 0) {
            return new uint256[](0);
        } else {
            uint256[] memory result = new uint256[](tokenCount);
            for (uint256 index; index < tokenCount; index++) {
                result[index] = tokenOfOwnerByIndex(_owner, index);
            }
            return result;
        }
    }
}
