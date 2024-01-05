import React, {useEffect} from 'react'
import {init, useConnectWallet, useNotifications} from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import {ethers} from 'ethers'
import {AppConfig} from "../config/app-config";
import walletConnectModule from "@web3-onboard/walletconnect";
import walletLinkModule from "@web3-onboard/walletlink";
import {ConnectedChain, EIP1193Provider} from "@web3-onboard/core";
import {Account} from "@web3-onboard/core/dist/types";

const injected = injectedModule()
const walletConnect = walletConnectModule();
const walletLink = walletLinkModule();


type WalletState = {
    label: string
    icon: string
    provider: EIP1193Provider
    accounts: Account[]
    chains: ConnectedChain[]
    instance?: unknown
}


// initialize Onboard
init({
    wallets: [walletLink, walletConnect, injected],
    chains: [
        {
            id: "0x1", // chain ID must be in hexadecimel
            token: "ETH", // main chain token
            namespace: "evm",
            label: "Ethereum Mainnet",
            rpcUrl: AppConfig.MAINNET_RPC_URL
        },
        {
            id: "0x3",
            token: "tROP",
            namespace: "evm",
            label: "Ethereum Ropsten Testnet",
            rpcUrl: AppConfig.ROPSTEN_RPC_URL
        },
        {
            id: "0x4",
            token: "rETH",
            namespace: "evm",
            label: "Ethereum Rinkeby Testnet",
            rpcUrl: AppConfig.RINKEBY_RPC_URL
        }
    ],
    appMetadata: {
        name: "My App",
        icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
        description: "My app using Onboard",
        recommendedInjectedWallets: [
            {name: "Coinbase", url: "https://wallet.coinbase.com/"},
            {name: "MetaMask", url: "https://metamask.io"}
        ]
    }
})


export const WalletConnectorWrapper = () => {

    const [
        notifications, // the list of all notifications that update when notifications are added, updated or removed
        customNotification, // a function that takes a customNotification object and allows custom notifications to be shown to the user, returns an update and dismiss callback
        updateNotify, // a function that takes a Notify object to allow updating of the properties
        preflightNotifications // a function that takes a PreflightNotificationsOption to create preflight notifications
    ] = useNotifications()

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

    useEffect(() => {
        console.log(notifications)
    }, [notifications])

    // create an ethers provider
    let ethersProvider: ethers.providers.Web3Provider

    if (wallet) {
        ethersProvider = new ethers.providers.Web3Provider(wallet.provider, 'any')
        // walletService.setProvider(ethersProvider)
    }

    const sendTransactionWithPreFlightNotifications = async (params: { toAddress: string; txAmount: number }) => {
        let balanceValue: string
        if (wallet?.accounts[0].balance) {
            balanceValue = Object.values(wallet.accounts[0].balance)[0]
        } else {
            balanceValue = ""
        }

        const signer = ethersProvider.getSigner()

        const txDetails = {
            to: params.toAddress,
            value: params.txAmount
        }

        const sendTransaction = () => {
            return signer.sendTransaction(txDetails).then(tx => tx.hash)
        }
        const gasPrice = () => ethersProvider.getGasPrice().then(res => res.toString())

        const estimateGas = () => {
            return ethersProvider.estimateGas(txDetails).then(res => res.toString())
        }

        const transactionHash =
            await preflightNotifications({
                sendTransaction,
                gasPrice,
                estimateGas,
                balance: balanceValue,
                txDetails: txDetails
            })
        console.log(transactionHash)

    }


    return (
        <div>
            <button
                disabled={connecting}
                onClick={() => (wallet ? disconnect({label: "Test Disconnect"}) : connect())}
            >
                {connecting ? 'connecting' : wallet ? 'disconnect' : 'connect'}
            </button>
            <button onClick={() => {
                console.log(wallet?.accounts)
            }}>
                get address
            </button>
        </div>
    )
}