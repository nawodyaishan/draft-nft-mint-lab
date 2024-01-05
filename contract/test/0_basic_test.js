const {deployments, network, getNamedAccounts, assert} = require('hardhat');
const {reinitializeContract} = require("./utils/test_helpers");
const {toWei, assertFailure} = require("./utils/test_utils");

let token;

contract('COLLECTION BASIC TEST', (accounts) => {
    before(async () => {
        token = await reinitializeContract();
        await token.mintForCommunity(accounts[0], 2);
    });

    // META DATA
    it('Should emit correct token URIs', async () => {
        const tokenUri = await token.tokenURI(1);
        console.log(`First token URI is ${tokenUri}`);
    })
    it('Should have correct total supply', async () => {
        const totalSupply = await token.totalSupply();
        assert.equal(totalSupply.toNumber(), 2);
    })
    it('Should have correct total supply', async () => {
        const totalSupply = await token.totalSupply();
        assert.equal(totalSupply.toNumber(), 2);
    })
    it('Should purchase just fine for free in presale', async () => {
        await token.mint(accounts[1], 1, {from: accounts[1]});
        const totalSupply = await token.totalSupply();
        assert.equal(totalSupply.toNumber(), 3);
    })
    it('Balance check should work', async () => {
        const balance = await token.balanceOf(accounts[1]);
        assert.equal(balance.toNumber(), 1);
    })
    it('Should fail to mint with low eth value', async () => {
        await token.setPresaleMintPrice(toWei(0.05));
        await assertFailure(
            () => token.mint(accounts[1], 1, {from: accounts[1], value: toWei(0.0001)}));
        const totalSupply = await token.totalSupply();
        assert.equal(totalSupply.toNumber(), 3);
    })
    it('Should be able to mint with account[1]', async () => {
        await token.mint(accounts[1], 1, {from: accounts[1], value: toWei(0.05)})
        const totalSupply = await token.totalSupply();
        assert.equal(totalSupply.toNumber(), 4);
    })
    it('Should be able to mint with account[2]', async () => {
        await token.toggleSaleState();
        await token.setMintPrice(toWei(0.1));
        await token.mint(accounts[2], 2, {from: accounts[2], value: toWei(0.2)});
        const totalSupply = await token.totalSupply();
        assert.equal(totalSupply.toNumber(), 6);
    })
    it('Fetches correct token owner', async () => {
        const tokenOwner = await token.ownerOf(1);
        assert.equal(tokenOwner, accounts[0]);
    })
    it('Fetches correct remaining supply', async () => {
        const maxSupply = await token.maxSupply();
        const remainingSupply = await token.remainingSupply();
        assert.equal(remainingSupply, maxSupply - 6);
    })
    it('Should fail buying more than available', async () => {
        const remainingSupply = await token.remainingSupply();
        await assertFailure(() => token.mint(accounts[2], remainingSupply.toNumber() + 1, {
            from: accounts[2],
            value: toWei(1)
        }));
    })
    it('Should get correct available supply', async () => {
        const maxSupply = (await token.maxSupply()).toNumber();
        const remainingSupply = (await token.remainingSupply()).toNumber();

        assert.strictEqual(maxSupply - remainingSupply, 6, 'Available supply is incorrect');
    })
    it('Should output correct base URI', async () => {
        await token.setBaseUri('ipfs://QmeyFkV9qrvcRzsvxB7pjzQ9RivKXThwHyBv6ZpWryrKNi/');
        const baseUri = await token.baseUri();
        assert.strictEqual('ipfs://QmeyFkV9qrvcRzsvxB7pjzQ9RivKXThwHyBv6ZpWryrKNi/', baseUri, 'Incorrect base URL');
    })
    it('Should output correct token URIs', async () => {
        const tokenUri = await token.tokenURI(1);
        assert.strictEqual('ipfs://QmeyFkV9qrvcRzsvxB7pjzQ9RivKXThwHyBv6ZpWryrKNi/1.json', tokenUri, 'Incorrect token URL');
    })
})