import {ethers} from "hardhat";
import dotenv from "dotenv";

dotenv.config();

async function main() {
    const currentTimestampInSeconds = Math.round(Date.now() / 1000);
    const unlockTime = currentTimestampInSeconds + 60;
    const lockedAmount = ethers.parseEther("0.001");

    const draftMinterFactory = await ethers.getContractFactory("DraftMinter");
    const DraftMinter = await draftMinterFactory.deploy()
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
