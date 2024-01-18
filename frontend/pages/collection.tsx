import React from 'react';
import {useContract, useNFTs} from '@thirdweb-dev/react';
import styles from '../styles/Home.module.css';
import {NFTCard} from '../components/NFTCard';
import {abi} from '../constants/abi';
import Spinner from '../components/Spinner'; // Assuming you have a Spinner component

const CollectionPage = () => {
    const contractAddress = '0xAAfb680fce8be4f599D503207b4f765409e83bf0';

    const {
        contract,
        isLoading: isLoadingContract,
        error: errorContract,
    } = useContract(contractAddress, abi);

    const {
        data: nfts,
        isLoading: isLoadingNfts,
        error: errorNfts,
    } = useNFTs(contract);

    if (isLoadingContract || isLoadingNfts) {
        return (
            <div className={styles.container}>
                <Spinner/>
                <p>Loading...</p>
            </div>
        );
    }

    if (errorContract) {
        return (
            <div className={styles.container}>
                <p>Error loading contract: {errorContract.toString() || 'Unknown error'}</p>
            </div>
        );
    }

    if (errorNfts) {
        return (
            <div className={styles.container}>
                <p>Error loading NFTs: {errorNfts.toString() || 'Unknown error'}</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1>Collection</h1>
            <div className={styles.grid} style={{marginBottom: '1rem'}}>
                {nfts && nfts.length > 0 ? (
                    nfts.map((nft) => <NFTCard key={nft.metadata.id} nft={nft}/>)
                ) : (
                    <p>No NFTs found in the collection.</p>
                )}
            </div>
        </div>
    );
};

export default CollectionPage;
