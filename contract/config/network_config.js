const networkConfigs = {
    hardhat: {
        gasConfig: {
            gasLimit: 3000000,
            gasPrice: 1000000000,
        }
    },
    eth: {
        gasConfig: {
            gasLimit: 3000000,
            gasPrice: 1000000000,
        }
    },
    ethTestnet: {
        gasConfig: {
            gasLimit: 3000000,
            gasPrice: 1000000000,
        }
    },
    bscTestnet: {
        gasConfig: {
            gasLimit: 3000000,
            gasPrice: 1000000000,
        }
    },
    localhost: {
        gasConfig: {
            gasLimit: 3000000,
            gasPrice: 1000000000,
        }
    },
    bsc: {
        gasConfig: {
            gasLimit: 3000000,
            gasPrice: 5000000500,
        }
    },
}
module.exports = {
    networkConfigs,
}