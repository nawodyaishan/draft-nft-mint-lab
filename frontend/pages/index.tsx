import React, {useState} from 'react';
import {useAddress} from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import {NextPage} from "next";

const Home: NextPage = () => {
    const address = useAddress();
    const [nftName, setNftName] = useState<string>("");
    const [nftDescription, setNftDescription] = useState<string>("");
    const [mintingNFT, setMintingNFT] = useState<boolean>(false);


    const handleMintNFT = async () => {
        setMintingNFT(true);
        try {
            const formData = new FormData();
            formData.append('name', nftName);
            formData.append('address', address || '');

            const response = await fetch("/api/mintNFT", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong");
            }
            // Handle successful response
            console.log("NFT minted:", data);
        } catch (error) {
            console.error("Minting error:", error);
        } finally {
            alert("NFT minted!");
            setMintingNFT(false);
            setNftName("");
            setNftDescription("");
        }
    };

    const handleMintFT = async () => {
        setMintingNFT(true);
        try {
            const formData = new FormData();
            formData.append('name', nftName);
            formData.append('address', address || '');

            const response = await fetch("/api/mintNFT", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong");
            }
            // Handle successful response
            console.log("NFT minted:", data);
        } catch (error) {
            console.error("Minting error:", error);
        } finally {
            alert("NFT minted!");
            setMintingNFT(false);
            setNftName("");
            setNftDescription("");
        }
    };


    return (
        <div className={styles.container}>
            {address ? (
                <div className={styles.minterContainer}>
                    <div className={styles.mintContainerSection}>
                        <h1>NFT Metadata</h1>
                        <p>NFT Name:</p>
                        <input
                            type="text"
                            placeholder="My NFT Name"
                            onChange={(e) => setNftName(e.target.value)}
                            value={nftName}
                            className={styles.metadataInput}
                        />
                        <p>NFT Description:</p>
                        <input
                            type="text"
                            placeholder="This NFT is about..."
                            onChange={(e) => setNftDescription(e.target.value)}
                            value={nftDescription}
                            className={styles.metadataInput}
                        />
                        <button
                            className={styles.mintButton}
                            onClick={handleMintNFT}
                            disabled={mintingNFT}
                        >{mintingNFT ? "Minting NFT..." : "Mint NFT"}</button>
                    </div>
                </div>
            ) : (
                <div>
                    <h1>Sign in to mint an NFT</h1>
                </div>
            )}
        </div>
    );
};

export default Home;