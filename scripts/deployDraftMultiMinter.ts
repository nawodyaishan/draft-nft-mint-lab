import {ethers} from "hardhat";
import dotenv from "dotenv";
import {EnvUtils} from "../utils/envUtils";

dotenv.config();

EnvUtils.checkEnvVariables([
    "BASE_METADATA_URI"
]);

async function main() {
    const currentTimestampInSeconds = Math.round(Date.now() / 1000);
    const unlockTime = currentTimestampInSeconds + 60;
    const lockedAmount = ethers.parseEther("0.001");
    const baseMetaDataUri: string = process.env.BASE_METADATA_URI!

    const draftMultiMinterFactory = await ethers.getContractFactory("DraftMultiMinter");
    const DraftMultiMinter = await draftMultiMinterFactory.deploy()
    await DraftMultiMinter.waitForDeployment();

    console.log(
        `Lock with ${ethers.formatEther(
            lockedAmount
        )}ETH and unlock timestamp ${unlockTime} deployed to ${DraftMultiMinter.target}`
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
