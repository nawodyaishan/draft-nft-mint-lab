const testUtils = require("./test_utils");
const {network, deployments} = require("hardhat");
const Minter = artifacts.require('Minter');

async function resetNetwork() {
    if (network.name !== 'hardhat') return;
    await network.provider.request({
        method: "hardhat_reset",
        params: [{
            forking: {
                jsonRpcUrl: 'https://mainnet.infura.io/v3/eff4b3f0d7954290a00d4a415f7ef1ee',
                blockNumber: 12610855,
            }
        },],
    });
}

async function reinitializeContract() {
    await resetNetwork();
    await deployments.fixture(['CONTRACT']);
    const tokenDep = await deployments.get('Minter');
    return await Minter.at(tokenDep.address);
}


module.exports = {
    resetNetwork,
    reinitializeContract,
}