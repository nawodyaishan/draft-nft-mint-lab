import {Inject, Service, StatefulService} from "react-service-locator";
import ABI from '../config/abi.json';
import {ethers} from "ethers";
import {AppConfig} from "../config/app-config";
import {UiService} from "./ui-service";
import {WalletState} from "@web3-onboard/core";

export interface IMintingServiceState {
    isBusy: boolean;
}

@Service()
export class MintingService extends StatefulService<IMintingServiceState> {
    static readonly initialState: IMintingServiceState = {
        isBusy: false
    };

    @Inject(UiService)
    private readonly uiService?: UiService;

    constructor() {
        super(MintingService.initialState);
    }

    // // New method to fetch token URI
    // public async fetchTokenURI(contract: ethers.Contract, tokenId: number): Promise<string> {
    //     try {
    //         return await contract.tokenURI(tokenId);
    //     } catch (e: any) {
    //         console.error('Error fetching token URI:', e);
    //         throw e;
    //     }
    // }

    public async mint(walletState: WalletState | null): Promise<string> {
        if (walletState) {
            const ethersProvider = new ethers.providers.Web3Provider(walletState.provider, 'any');
            try {
                const nftContract = new ethers.Contract(AppConfig.contract, ABI, ethersProvider);
                const signer = ethersProvider.getSigner();
                const nftContractWithSigner = nftContract.connect(signer);
                await nftContractWithSigner.safeMint(walletState.accounts[0].address);
                this.uiService?.addMessageAlert({
                    title: 'Success',
                    subtitle: "Transaction Successful"
                });
                return "Success";
            } catch (e: any) {
                console.log(e.message);
                this.uiService?.addMessageAlert({
                    title: 'Error',
                    subtitle: e.message
                });
                return "Failed";
            }
        } else {
            console.log("Wallet not Connected");
            this.uiService?.addMessageAlert({
                title: 'Wallet Not connected',
                subtitle: 'Please connect your wallet first.'
            });
            return "Failed";
        }
    }
}
