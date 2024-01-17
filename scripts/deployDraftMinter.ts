import {ethers} from "hardhat";
import dotenv from "dotenv";
import {EnvUtils} from "../utils/envUtils";

dotenv.config();

EnvUtils.checkEnvVariables([
    "PUBLIC_KEY"
]);

async function main() {
    const currentTimestampInSeconds = Math.round(Date.now() / 1000);
    const unlockTime = currentTimestampInSeconds + 60;
    const lockedAmount = ethers.parseEther("0.001");
    const initialOwner: string = process.env.PUBLIC_KEY!

    const draftMinterFactory = await ethers.getContractFactory("DraftMinter");
    const DraftMinter = await draftMinterFactory.deploy(initialOwner)
    await DraftMinter.waitForDeployment();

    console.log(
        `Lock with ${ethers.formatEther(
            lockedAmount
        )}ETH and unlock timestamp ${unlockTime} deployed to ${DraftMinter.target}`
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
