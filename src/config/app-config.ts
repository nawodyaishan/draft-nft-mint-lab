export abstract class AppConfig {
    public static readonly infuraId = '5cd865ec9913478c82e1e48307d90c8f';
    public static readonly infuraSecret = '835c6a7cb19a4302a9da4d835d1152ae';
    public static readonly contract = '0x01B3fc0f4bfd38d837dc35629c9AC7967cFE19F0';
    public static readonly localhost = 'http://127.0.0.1:8545/';
    public static readonly isTestnet = true;

    public static readonly MAINNET_RPC_URL = "https://mainnet.infura.io/v3/5cd865ec9913478c82e1e48307d90c8f";
    public static readonly SEPOLIA_RPC_URL = "https://sepolia.infura.io/v3/5cd865ec9913478c82e1e48307d90c8f";

    public static readonly chainId = this.isTestnet ? "4" : "1";

}