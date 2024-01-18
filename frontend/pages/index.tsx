import React, {useState} from 'react';
import {useAddress} from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import {NextPage} from "next";
import {FTPayload, NFTPayload, TokenTypes} from "../interfaces/token-data-types";

const Home: NextPage = () => {
    const address = useAddress();
    const [tokenType, setTokenType] = useState<TokenTypes | undefined>();
    const [ftAmount, setFtAmount] = useState<number>(0);
    const [minting, setMinting] = useState<boolean>(false);

    const handleMint = async () => {
        if (tokenType === undefined || address === undefined) {
            alert("Minting error! Undefined Values");
            return
        }
        setMinting(true);
        try {
            if (tokenType === TokenTypes.EXPERIENCE_BOOST || tokenType === TokenTypes.IN_GAME_CURRENCY) {
                const ftPayload: FTPayload = {
                    address: address,
                    amount: ftAmount,
                    tokenId: tokenType
                }
                console.log("🚀 - payload data", ftPayload)

                const response = await fetch("/api/mint", {
                    method: "POST",
                    body: JSON.stringify(ftPayload),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Something went wrong");
                }
                console.log("Token minted:", data);
                alert("Token minted!");

            } else {
                const nftPayload: NFTPayload = {
                    address: address,
                    tokenId: tokenType
                }
                console.log("🚀 - payload data", nftPayload)

                const response = await fetch("/api/mint", {
                    method: "POST",
                    body: JSON.stringify(nftPayload),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Something went wrong");
                }
                console.log("Token minted:", data);
                alert("Token minted!");
            }
        } catch (error) {
            console.error("Minting error:", error);
            alert("Minting error!");
        } finally {
            setMinting(false);
            setFtAmount(0);
        }
    };

    const isNFT = () => {
        return tokenType === TokenTypes.PLAYER_CARD || tokenType === TokenTypes.STADIUM_VILLAGE_BUILDING;
    };

    return (
        <div className={styles.container}>
            {address ? (
                <div className={styles.minterContainer}>
                    <div className={styles.mintContainerSection}>
                        <h1>{isNFT() ? "NFT Metadata" : "FT Minting"}</h1>

                        <p>Token Type:</p>
                        <select
                            onChange={(e) => setTokenType(Number(e.target.value) as TokenTypes)}
                            value={tokenType}
                            className={styles.metadataInput}
                        >
                            <option value={undefined}>Select Token Type</option>
                            <option value={TokenTypes.IN_GAME_CURRENCY}>In-Game Currency</option>
                            <option value={TokenTypes.EXPERIENCE_BOOST}>Experience Boost</option>
                            <option value={TokenTypes.PLAYER_CARD}>Player Card</option>
                            <option value={TokenTypes.STADIUM_VILLAGE_BUILDING}>Stadium Village Building</option>
                        </select>

                        {isNFT() ? (
                            <>

                            </>
                        ) : (
                            <>
                                <p>Amount:</p>
                                <input
                                    type="number"
                                    placeholder="Amount"
                                    onChange={(e) => setFtAmount(Number(e.target.value))}
                                    value={ftAmount}
                                    className={styles.metadataInput}
                                />
                            </>
                        )}

                        <button
                            className={styles.mintButton}
                            onClick={handleMint}
                            disabled={minting}
                        >{minting ? "Minting..." : "Mint"}</button>
                    </div>
                </div>

            ) : (
                <div>
                    <h1>Sign in to mint a token</h1>
                </div>
            )}
        </div>
    );
};

export default Home;
