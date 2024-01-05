// import { HardhatUserConfig } from 'hardhat/config';
// import '@nomiclabs/hardhat-waffle';
// import '@nomiclabs/hardhat-ethers';
// import 'dotenv/config';
//
// const config: HardhatUserConfig = {
//   solidity: '0.8.0',
//   networks: {
//     hardhat: {
//       chainId: 31337,
//     },
//   },
//   mocha: {
//     timeout: 20000,
//   },
// };
//
// export default config;

import {HardhatUserConfig} from 'hardhat/config';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers'; // Add this line
import 'dotenv/config';

const INFURA_API_KEY = "5cd865ec9913478c82e1e48307d90c8f";
const SEPOLIA_PRIVATE_KEY = "6dd5f918660ada299d2c60994df8492ce00ee0d63de2335a6355d496c26c39fa";

const config: HardhatUserConfig = {
    solidity: '0.8.22',
    networks: {
        hardhat: {
            chainId: 31337,
        },
        fuji: {
            url: "https://api.avax-test.network/ext/bc/C/rpc",
            chainId: 43113,
            gasPrice: 225000000000,
            accounts: [process.env.PRIVATE_KEY || ""],
        },
        sepolia: {
            url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
            accounts: [SEPOLIA_PRIVATE_KEY]

        }
    },
    mocha: {
        timeout: 20000,
    },
};

export default config;