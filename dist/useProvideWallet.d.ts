import { SignerTransaction as DeflySignerTransaction } from '@blockshake/defly-connect/dist/util/model/deflyWalletModels';
import { SignerTransaction } from '@perawallet/connect/dist/util/model/peraWalletModels';
declare global {
    interface Window {
        Ultrade: {
            [key in WalletKeys]?: UseWalletSign | PeraWalletSign | DeflyWalletSign;
        };
    }
}
export declare enum WalletKeys {
    UseWallet = "txnlab-use-wallet",
    Pera = "PeraWallet.Wallet",
    Defly = "DeflyWallet.Wallet",
    MyAlgo = "MyAlgoWallet"
}
type UseWalletSign = (transactions: Uint8Array[], indexesToSign?: number[], returnGroup?: boolean) => Promise<Uint8Array[]>;
type PeraWalletSign = (txGroups: SignerTransaction[][], signerAddress?: string | undefined) => Promise<Uint8Array[]>;
type DeflyWalletSign = (txGroups: DeflySignerTransaction[][], signerAddress?: string | undefined) => Promise<Uint8Array[]>;
export declare const createUltradeObj: () => void;
export declare const useProvideWallet: () => {
    setSignFunction: (walletProvider: WalletKeys, sign: UseWalletSign | PeraWalletSign | DeflyWalletSign) => void;
    clearSignFunction: (walletProvider: WalletKeys) => void;
};
export {};
