import type {AppProps} from "next/app";
import {coinbaseWallet, metamaskWallet, ThirdwebProvider, walletConnect} from "@thirdweb-dev/react";
import "../styles/globals.css";
import {Mumbai} from "@thirdweb-dev/chains";
import {Navbar} from "../components/NavBar";

const activeChain = Mumbai;

function MyApp({Component, pageProps}: AppProps) {
    return (
        <ThirdwebProvider
            clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
            activeChain={activeChain}
            supportedWallets={[
                metamaskWallet({recommended: true}),
                coinbaseWallet(),
                walletConnect(),
            ]}
        >
            <Navbar/>
            <Component {...pageProps} />
        </ThirdwebProvider>
    );
}

export default MyApp;
