import {NextApiRequest, NextApiResponse} from "next";
import {IncomingForm} from "formidable";
import {ThirdwebSDK} from "@thirdweb-dev/sdk";

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        return res.status(405).json({error: "Method not allowed, please use POST"});
    }

    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
        const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
        const address = Array.isArray(fields.address) ? fields.address[0] : fields.address;


        if (!name || !address) {
            return res.status(400).json({error: "Missing required fields"});
        }

        const {
            TW_ACCESS_TOKEN,
            TW_SECRET_KEY
        } = process.env;

        if (!TW_ACCESS_TOKEN || !TW_SECRET_KEY) {
            return res.status(500).json({error: "Missing environment variables"});
        }

        try {
            const sdk = new ThirdwebSDK("mumbai", {
                clientId: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID,
            });
            const contract = await sdk.getContract("0x33C6a1bA07046f8731D50a22C2dF92114570Cc39");
            const response = await contract.call("mintFT", [address, 1, 100, "0x"])

            console.log("NFT minted: ", response);
            res.status(200).json({message: "NFT minted successfully", response});
        } catch (error: any) {
            console.error("Error processing file: ", error);
            res.status(500).json({error: error.message || "An error occurred during minting"});
        }
    });
};

export default handler;