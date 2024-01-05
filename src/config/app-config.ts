export abstract class AppConfig {
    public static readonly infuraId = 'eff4b3f0d7954290a00d4a415f7ef1ee';
    public static readonly infuraSecret = '835c6a7cb19a4302a9da4d835d1152ae';
    public static readonly contract = '0x7c8e9e1fab16d35e90cf2f040c4024e79e0047b5';
    public static readonly localhost = 'http://127.0.0.1:8545/';
    public static readonly isTestnet = true;

    public static readonly MAINNET_RPC_URL = "https://mainnet.infura.io/v3/eff4b3f0d7954290a00d4a415f7ef1ee";
    public static readonly ROPSTEN_RPC_URL = "https://ropsten.infura.io/v3/eff4b3f0d7954290a00d4a415f7ef1ee";
    public static readonly RINKEBY_RPC_URL = "https://rinkeby.infura.io/v3/eff4b3f0d7954290a00d4a415f7ef1ee";

    public static readonly chainId = this.isTestnet ? "4" : "1";

}