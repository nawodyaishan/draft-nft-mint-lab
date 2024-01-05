import React, {useEffect} from "react";
import {useService} from "react-service-locator";
import {MintingService} from "../services/minting-service";
import {WalletConnectorWrapper} from "../components/WalletConnectorWrapper";
import {Button} from "react-bootstrap";
import {useConnectWallet} from "@web3-onboard/react";

export const Lab = () => {

    const mintingService = useService(MintingService);
    useEffect(() => {
        console.log("Updated Ui")
    }, [mintingService.state.amount])

    const [
        {
            wallet, // the wallet that has been connected or null if not yet connected
            connecting // boolean indicating if connection is in progress
        },
        connect, // function to call to initiate user to connect wallet
        disconnect, // function to call with wallet<DisconnectOptions> to disconnect wallet
        updateBalances, // function to be called with an optional array of wallet addresses connected through Onboard to update balance or empty/no params to update all connected wallets
        setWalletModules, // function to be called with an array of wallet modules to conditionally allow connection of wallet types i.e. setWalletModules([ledger, trezor, injected])
        setPrimaryWallet // function that can set the primary wallet and/or primary account within that wallet. The wallet that is set needs to be passed in for the first parameter and if you would like to set the primary account, the address of that account also needs to be passed in
    ] = useConnectWallet()


    return (
        <div>
            <Button onClick={() => {
                mintingService.setMintAmount(mintingService.mintAmount + 1)
            }}>
                +
            </Button>

            <Button onClick={() => {
                if (mintingService.mintAmount > 0) {
                    mintingService.setMintAmount(mintingService.mintAmount - 1)
                }
            }}>
                -
            </Button>

            <div>
                {mintingService.mintAmount}
            </div>

            <Button onClick={async () => {
                await mintingService.mint(wallet)
            }}>
                Mint Now
            </Button>

            <WalletConnectorWrapper/>

        </div>
    );
}