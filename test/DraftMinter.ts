import {expect} from "chai";
import {ethers} from "hardhat";
import {DraftMinter} from "../typechain-types";
import {HardhatEthersSigner} from "@nomicfoundation/hardhat-ethers/signers";

describe("DraftMinter Contract", function () {
    let DraftMinter;
    let draftMinter: DraftMinter;
    let owner: HardhatEthersSigner;
    let addr1: HardhatEthersSigner;
    let addr2: HardhatEthersSigner;
    let addresses: HardhatEthersSigner[];

    beforeEach(async function () {
        // Get the ContractFactory and Signers here.
        DraftMinter = await ethers.getContractFactory("DraftMinter");
        [owner, addr1, addr2, ...addresses] = await ethers.getSigners();

        // Deploy a new DraftMinter contract before each test.
        draftMinter = await DraftMinter.deploy(owner.address);
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await draftMinter.owner()).to.equal(owner.address);
        });

        it("Should deploy with zero tokens minted", async function () {
            expect(await draftMinter.totalSupply()).to.equal(0);
        });
    });

    describe("Minting", function () {
        it("Should mint a new token and assign it to owner", async function () {
            await draftMinter.safeMint(owner.address, "tokenURI");
            expect(await draftMinter.balanceOf(owner.address)).to.equal(1);
        });

        it("Should fail for non-owner minting", async function () {
            await expect(
                draftMinter.connect(addr1).safeMint(addr1.address, "tokenURI")
            ).to.be.reverted; // Update with specific error message if known
        });
    });

    describe("Pausing", function () {
        it("Should pause and unpause the contract", async function () {
            await draftMinter.pause();
            expect(await draftMinter.paused()).to.equal(true);

            await draftMinter.unpause();
            expect(await draftMinter.paused()).to.equal(false);
        });

        it("Should prevent minting when paused", async function () {
            await draftMinter.pause();
            await expect(
                draftMinter.safeMint(owner.address, "tokenURI")
            ).to.be.reverted;
        });
    });

    describe("Token URI", function () {
        it("Should return the correct tokenURI", async function () {
            const uri = "uniqueTokenURI";
            const expectedURI = "https://turquoise-rear-loon-357.mypinata.cloud/ipfs/QmU9pYR9CxUN1DaHENo4iVcoGJJ13ZGCxQ5mCAqdtC7CdU/" + uri;
            await draftMinter.safeMint(owner.address, uri);
            expect(await draftMinter.tokenURI(0)).to.equal(expectedURI);
        });
    });

    describe("Access Control", function () {
        it("Should restrict pause and unpause to owner", async function () {
            await expect(draftMinter.connect(addr1).pause()).to.be.reverted; // Update with specific error message if known
            await expect(draftMinter.connect(addr1).unpause()).to.be.reverted; // Update with specific error message if known
        });
    });

    describe("ERC721 Compliance", function () {
        it("Should support ERC721 interface", async function () {
            expect(
                await draftMinter.supportsInterface("0x80ac58cd") // ERC721 interface ID
            ).to.be.true;
        });

        it("Should support ERC721 metadata interface", async function () {
            expect(
                await draftMinter.supportsInterface("0x5b5e139f") // ERC721 metadata interface ID
            ).to.be.true;
        });

        it("Should support ERC721 enumerable interface", async function () {
            expect(
                await draftMinter.supportsInterface("0x780e9d63") // ERC721 enumerable interface ID
            ).to.be.true;
        });
    });
});
