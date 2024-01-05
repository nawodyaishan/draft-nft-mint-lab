import {Inject, Service, StatefulService} from "react-service-locator";
import ABI from '../config/abi.json'
import {ethers} from "ethers";
import {AppConfig} from "../config/app-config";
import {UiService} from "./ui-service";
import {WalletState} from "@web3-onboard/core";

export interface IMintingServiceState {
    isBusy: boolean,
    amount: number
}

@Service()
export class MintingService extends StatefulService<IMintingServiceState> {
    static readonly initialState: IMintingServiceState = {
        isBusy: false,
        amount: 0
    };
    @Inject(UiService)
    private readonly uiService?: UiService;

    constructor() {
        super(MintingService.initialState);
    }

    public get mintAmount() {
        return this.state.amount;
    }

    public async mint(walletState: WalletState | null): Promise<string> {

        if (walletState) {
            const ethersProvider = new ethers.providers.Web3Provider(walletState.provider, 'any')
            if (this.state.amount === 0) {
                this.uiService?.addMessageAlert({
                    title: 'Insufficient Nft Amount',
                    subtitle: "Please Enter Valid Nft Amount"
                });
                return "Failed"
            }
            try {
                const nftContract = new ethers.Contract(AppConfig.contract, ABI, ethersProvider);
                const signer = ethersProvider.getSigner()
                const nftContractWithSigner = nftContract.connect(signer);
                await nftContractWithSigner.mint(walletState.accounts[0].address, this.state.amount);
                this.setMintAmount(0);
                this.uiService?.addMessageAlert({
                    title: 'Success',
                    subtitle: "Transaction Successful"
                });
                return "Success"
            } catch (e: any) {
                console.log(e.message)
                this.uiService?.addMessageAlert({
                    title: 'Error',
                    subtitle: e.message
                });
                this.setMintAmount(0);
                return "Failed";
            }

        } else {
            console.log("Wallet not Connected")
            this.uiService?.addMessageAlert({
                title: 'Wallet Not connected',
                subtitle: 'Please connect your wallet first.'
            });
            return "Failed"
        }
    }

    public setMintAmount(val: number) {
        this.setState({
            ...this.state,
            amount: val
        })
    }

}