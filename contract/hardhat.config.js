/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('@nomiclabs/hardhat-waffle');
require("@nomiclabs/hardhat-truffle5");
require('hardhat-deploy');
require("@nomiclabs/hardhat-etherscan");
const fs = require("fs");
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
    defaultNetwork: 'hardhat',
    namedAccounts: {
        deployer: 0,
        tokenOwner: 0,
        liquidityWallet: 7,
        marketingWallet: 8,
        appWallet: 9
    },
    networks: {
        hardhat: {
            chainId: 1,
            loggingEnabled: false,
            forking: {
                url: 'https://mainnet.infura.io/v3/eff4b3f0d7954290a00d4a415f7ef1ee',
                blockNumber: 12610855
            },
            allowUnlimitedContractSize: false
        },
        eth: {
            url: 'https://mainnet.infura.io/v3/eff4b3f0d7954290a00d4a415f7ef1ee',
            loggingEnabled: true,
            allowUnlimitedContractSize: false,
            accounts: {
                mnemonic: mnemonic
            }
        },
        ethTestnet: {
            url: `https://rinkeby.infura.io/v3/eff4b3f0d7954290a00d4a415f7ef1ee`,
            network_id: 4,
            loggingEnabled: true,
            accounts: {
                mnemonic: mnemonic
            }
        },
        localhost: {
            url: `http://127.0.0.1:8545`,
            network_id: 31337,
            loggingEnabled: true,
            accounts: [
                "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
            ]
        },
        bscTestnet: {
            url: ``,
            network_id: 97,
            loggingEnabled: true,
            accounts: {
                mnemonic: mnemonic
            }
        },
        bsc: {
            url: ``,
            network_id: 56,
            loggingEnabled: true,
            accounts: {
                mnemonic: mnemonic
            }
        }
    },
    etherscan: {
        apiKey: {
            // binance smart chain
            bsc: "27C7T2PBAPH1PQ8HI8MFGT4BYH8D6SZ1P1",
            bscTestnet: "27C7T2PBAPH1PQ8HI8MFGT4BYH8D6SZ1P1",
            rinkeby: "IJ54E4QY5PI8SV8I9AV6F2CM57FQ1ZJS39",
            mainnet: "IJ54E4QY5PI8SV8I9AV6F2CM57FQ1ZJS39"
        }
    },
    solidity: {
        version: "0.8.2",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    },
    mocha: {
        timeout: 200000
    }
};