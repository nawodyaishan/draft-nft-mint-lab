import {ThirdwebNftMedia, useContract, useContractMetadata, useNFTs} from "@thirdweb-dev/react";

const CollectionPage = () => {
    const {contract} = useContract("0x33C6a1bA07046f8731D50a22C2dF92114570Cc39");
    const {data: nfts, isLoading} = useNFTs(contract);
    const {data: metadata, isLoading: loadingMetadata} = useContractMetadata(contract);

    return (
        <main className="mintCollectionSection">
            {!loadingMetadata && (
                <header className="mintCollectionSection">
                    <h1>{metadata?.name}</h1>
                </header>
            )}
            {!isLoading ? (
                <div className="gallery">
                    {nfts?.map(e => (
                        <div key={e.metadata.id} className="card">
                            <ThirdwebNftMedia metadata={e.metadata}/>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="loading">Loading...</p>
            )}
        </main>
    );
};

export default CollectionPage;
