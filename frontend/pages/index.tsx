import React, {useState} from 'react';
import {useAddress, useContract, useContractEvents, useContractWrite} from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import {NextPage} from "next";
import {TokenTypes} from "../interfaces/token-data-types";

const Home: NextPage = () => {
    const address = useAddress();
    const [tokenType, setTokenType] = useState<TokenTypes | undefined>();
    const [ftAmount, setFtAmount] = useState<number>(0);
    const [minting, setMinting] = useState<boolean>(false);
    const {contract} = useContract("0x33C6a1bA07046f8731D50a22C2dF92114570Cc39");
    const {mutateAsync: mintFT} = useContractWrite(contract, "mintFT");
    const {mutateAsync: mintNFT} = useContractWrite(contract, "mintNFT");
    const {data: allEvents} = useContractEvents(contract);
    const {data: eventNFTMinted} = useContractEvents(contract, "NFTMinted")
    const {data: eventFTMinted, isLoading} = useContractEvents(contract, "FTMinted")
    const handleMintFT = async () => {
        if (typeof tokenType === "undefined" || !address) return;
        setMinting(true);
        try {
            const data = await mintFT({args: [address, tokenType, ftAmount, "0x"]});
            console.info("FT minted successfully", data);
            if (eventFTMinted) {
                eventFTMinted.forEach(event => {
                    console.log(event, event.data)
                });
            }
        } catch (err) {
            console.error("FT minting error", err);
        }
        setMinting(false);
    };

    const handleMintNFT = async () => {
        if (typeof tokenType === "undefined" || !address) return;
        setMinting(true);
        try {
            const data = await mintNFT({args: [address, tokenType, "0x"]});
            console.info("NFT minted successfully", data);
            if (eventNFTMinted) {
                eventNFTMinted.forEach(event => {
                    console.log(event, event.data)
                });
            }
        } catch (err) {
            console.error("NFT minting error", err);
        }
        setMinting(false);
    };

    const handleMint = () => {
        if (isNFT()) {
            handleMintNFT();
        } else {
            handleMintFT();
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
                        <h1>{tokenType === undefined ? "Select Token to Mint" : (isNFT() ? "NFT Metadata" : "FT Minting")}</h1>

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
            <h2>Contract Events</h2>
            <div className={styles.eventsContainer}>
                <div className={styles.eventsList}>
                    {allEvents && allEvents.length > 0 ? (
                        allEvents.map((event, index) => (
                            <div key={index} className={styles.eventCard}>
                                <h3>{event.eventName}</h3>
                                <p>{JSON.stringify(event.data)}</p>
                            </div>
                        ))
                    ) : (
                        <p>No events found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
