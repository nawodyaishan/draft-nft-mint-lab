import {ethers} from 'ethers';
import * as dotenv from 'dotenv';

dotenv.config();

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS as string || '0x0697aBc8Dc960d53911f4A8BB8989826b78CaF61';
if (!CONTRACT_ADDRESS) {
    throw new Error('Please set your contract address in the interact.ts script');
}
const ABI = [
    {
        "inputs": [],
        "name": "get",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "set",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const FUJI_RPC_URL = "https://api.avax-test.network/ext/bc/C/rpc";
const PRIVATE_KEY = process.env.PRIVATE_KEY as string || "6dd5f918660ada299d2c60994df8492ce00ee0d63de2335a6355d496c26c39fa";

async function interact() {
    dotenv.config();
    if (!CONTRACT_ADDRESS) {
        throw new Error("Please set your contract address in the interact.ts script");
    }

    const provider = new ethers.providers.JsonRpcProvider(FUJI_RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    console.log("Wallet address:", wallet.address);

    const simpleStorage = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);
    console.log("Contract address:", CONTRACT_ADDRESS);
    console.log("Contract instance:", simpleStorage);

    // Read stored data
    const storedData = await simpleStorage.get();
    console.log("Stored data:", storedData.toString());

    // Set new data
    const tx = await simpleStorage.set(100);
    await tx.wait();

    // Read updated stored data
    const updatedStoredData = await simpleStorage.get();
    console.log("Updated stored data:", updatedStoredData.toString());
}

interact().then(r => console.log("Complete"));