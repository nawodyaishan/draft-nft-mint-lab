import dotenv from "dotenv";
import {EnvUtils} from "../../utils/envUtils";

dotenv.config();

EnvUtils.checkEnvVariables([
    "CONTRACT_ADDRESS"
]);
export const NFT_COLLECTION_CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;