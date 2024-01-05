const Big = require('big.js');
const {ethers, waffle} = require("hardhat");
const provider = waffle.provider;

async function assertFailure(executor) {
    let threw = false;
    try {
        await executor();
    } catch (e) {
        threw = true;
    }
    assert.equal(threw, true);
}

function toWei(ethAmount) {
    return web3.utils.toWei(ethAmount.toString());
}

function fromWei(weiAmount) {
    return web3.utils.fromWei(weiAmount.toString());
}

function getEthBalance(accountAddress) {
    return provider.getBalance(accountAddress)
}

function rawToToken(rawAmount) {
    return new Big(rawAmount.toString()).div(new Big(10).pow(18)).toPrecision(18);
}

function rawToTokenNumber(rawAmount) {
    return parseFloat(rawToToken(rawAmount));
}

function tokenToRaw(tokenAmount) {
    return new Big(tokenAmount).mul(new Big(10).pow(18)).toFixed(0);
}

function percentToRaw(percent) {
    return (percent * 100).toFixed(0);
}

function bigNumberEqual(a, b) {
    return new Big(a.toString()).eq(new Big(b.toString()));
}

function bigNumberGt(a, b) {
    return new Big(a.toString()).gt(new Big(b.toString()));
}

function bigNumberLt(a, b) {
    return new Big(a.toString()).lt(new Big(b.toString()));
}

function bigNumberGte(a, b) {
    return new Big(a.toString()).gte(new Big(b.toString()));
}

function bigNumberLte(a, b) {
    return new Big(a.toString()).lte(new Big(b.toString()));
}

function assertBigNumberEqual(a, b) {
    assert(bigNumberEqual(a, b), `${a.toString()} != ${b.toString()}`);
}

function assertBigNumberGt(a, b) {
    assert(bigNumberGt(a, b), `${a.toString()} <= ${b.toString()}`);
}

function assertBigNumberLt(a, b) {
    assert(bigNumberLt(a, b), `${a.toString()} >= ${b.toString()}`);
}

function assertBigNumberGte(a, b) {
    assert(bigNumberGte(a, b), `${a.toString()} < ${b.toString()}`);
}

function assertBigNumberLte(a, b) {
    assert(bigNumberLte(a, b), `${a.toString()} > ${b.toString()}`);
}

module.exports = {
    assertFailure,
    toWei,
    fromWei,
    getEthBalance,
    rawToToken,
    tokenToRaw,
    rawToTokenNumber,
    bigNumberEqual,
    assertBigNumberEqual,
    percentToRaw,
    assertBigNumberGt,
    assertBigNumberLt,
    assertBigNumberGte,
    assertBigNumberLte,
}