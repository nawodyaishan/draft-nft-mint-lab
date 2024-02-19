## Overview

The `DraftMultiMinter` is a robust ERC-1155 contract facilitating the creation of various token types that are essential for diverse game mechanics and economies. This contract is specifically designed to enable:

* **Fungible Tokens (FTs):**  Represent in-game resources like currency and experience boosters.
* **Non-Fungible Tokens (NFTs):**  Serve as unique player cards, stadium elements, or collectible game assets.

## Key Features

* **Distinct Token Types:** Effortlessly categorize tokens into their specific roles, simplifying the creation of multifaceted game mechanics.
* **Efficient Minting:** Mints both fungible and non-fungible tokens in a streamlined manner.
* **NFT Supply Management:** Tracks the supply of NFTs with built-in safeguards to prevent over-minting and maintain scarcity.
* **Metadata Handling:** Provides a standard mechanism for defining individual token metadata that's compatible with external marketplaces and visualization tools.
* **Ownable:** Includes ownership controls to regulate contract administration.
* **Pausable:** Offers the ability to pause token transfers as needed for updates or emergency scenarios.

## Code Highlights

1. **ERC-1155 Standard:** Leverages the ERC-1155 standard to establish core functionalities for minting multiple token types with associated amounts and metadata in a single contract.

2. **Token Type Enumeration:** The `TokenType` enum allows for clear identification of supported token categories: 
   * `IN_GAME_CURRENCY`
   * `EXPERIENCE_BOOST`
   * `PLAYER_CARD`
   * `STADIUM_VILLAGE_BUILDING`

3. **Minting Functions:**  The contract implements separate functions for efficient minting:
   * `mintFT()`: Mint fungible tokens with defined types and quantities.
   * `mintNFT()`:  Create NFTs, tracking supply to enforce limits.

4. **Metadata Management:**  
   * `setURI()`: Provides an administrative function to update the base URI for metadata.
   * `uri()`: Overrides the standard `uri()` function to fetch dynamic metadata for each token based on its ID and the base URI.

## Getting Started

1. **Deployment:**
   *  Deploy the `DraftMultiMinter.sol` contract to your desired blockchain environment.

2. **Configuration:**
   * Replace the placeholder in the constructor (`"https://turquoise-rear-loon-357.mypinata.cloud/ipfs/QmahUaDqT8b4dMcibzZJzVy2edV2rTU6sKDUqcNavJEMJ7/{id}.json"`) with your actual base metadata URI if the IPFS-stored structure differs.

3. **Minting:**
   * Use the `mintFT()`  and `mintNFT()` functions to create the necessary tokens for your game.

## Using the Contract

To ensure efficient usage, make note of the following:

* **`getTokenId()` Function:** Utilize this function to obtain the token ID associated with a particular `TokenType`  which is vital for minting calls.
* **`isFungibleToken()` and `isNonFungibleToken()`**: Employ these helper functions to easily determine the type of a given token ID.
* **Access Controls:** Be cognizant that sensitive calls, such as minting, are reserved for the contract owner.

