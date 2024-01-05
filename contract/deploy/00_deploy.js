// Contract literals
const {waffle, ethers} = require("hardhat");
const {fromWei} = require("web3-utils");
const {networkConfigs} = require("../config/network_config");
const fs = require("fs");
const mnemonic = fs.readFileSync(".secret").toString().trim();
const minter = 'Minter'

// deployment
module.exports = async ({getNamedAccounts, network, deployments, run}) => {
    console.log("Enter to deployment....")
    const networkConfig = networkConfigs[network.name];
    const {deploy, execute, get} = deployments;
    const {deployer, appWallet, marketingWallet, liquidityWallet} = await getNamedAccounts();

    let mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic);
    console.log(mnemonicWallet.privateKey);
    const provider = waffle.provider;
    const balanceBefore = await provider.getBalance(deployer);
    const contract = await deploy(minter, {
        from: deployer,
        ...networkConfig.gasConfig,
    });
    const balanceAfter = await provider.getBalance(deployer);
    console.log(`Deployed to ${contract.address}`);
    console.log(`Deployment took ${fromWei(balanceBefore.sub(balanceAfter).toString())}`);
};


module.exports.tags = ['CONTRACT'];