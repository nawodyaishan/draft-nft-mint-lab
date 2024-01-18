import {NextApiRequest, NextApiResponse} from "next";
import {ThirdwebSDK} from "@thirdweb-dev/sdk";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        return res.status(405).json({error: "Method not allowed, please use POST"});
    }

    try {
        const {address, tokenType, amount, mintType} = req.body;

        if (!address || !mintType || typeof tokenType !== 'number' || (mintType === 'FT' && (typeof amount !== 'number' || amount <= 0))) {
            return res.status(400).json({error: "Missing or invalid required fields"});
        }

        const {NEXT_PUBLIC_TEMPLATE_CLIENT_ID, TW_SECRET_KEY} = process.env;
        if (!NEXT_PUBLIC_TEMPLATE_CLIENT_ID || !TW_SECRET_KEY) {
            return res.status(500).json({error: "Missing environment variables"});
        }

        const sdk = new ThirdwebSDK("mumbai", {
            secretKey: TW_SECRET_KEY,
        });
        const contract = await sdk.getContract("0x33C6a1bA07046f8731D50a22C2dF92114570Cc39");

        let response;
        if (mintType === 'FT') {
            response = await contract.call("mintFT", [address, tokenType, amount, "0x"]);
        } else if (mintType === 'NFT') {
            response = await contract.call("mintNFT", [address, tokenType, "0x"]);
        } else {
            return res.status(400).json({error: "Invalid minting type"});
        }

        console.log("Token minted: ", response);
        res.status(200).json({message: "Token minted successfully", response});
    } catch (error: any) {
        console.error("Minting error: ", error);
        res.status(500).json({error: error.message || "An error occurred during minting"});
    }
};

export default handler;
