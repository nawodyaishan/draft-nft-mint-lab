import type {AppProps} from "next/app";
import {coinbaseWallet, ThirdwebProvider, walletConnect} from "@thirdweb-dev/react";
import "../styles/globals.css";
import {Sepolia} from "@thirdweb-dev/chains";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = Sepolia;

function MyApp({Component, pageProps}: AppProps) {
    function metamaskWallet(): import("@thirdweb-dev/react").WalletConfig<any> {
        throw new Error("Function not implemented.");
    }

    return (
        <ThirdwebProvider
            clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
            activeChain={activeChain}
            supportedWallets={[metamaskWallet(), coinbaseWallet(), walletConnect()]}
        >
            <Component {...pageProps} />
        </ThirdwebProvider>
    );
}

export default MyApp;
