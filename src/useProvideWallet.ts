import { SignerTransaction as DeflySignerTransaction } from '@blockshake/defly-connect/dist/util/model/deflyWalletModels';
import { SignerTransaction } from '@perawallet/connect/dist/util/model/peraWalletModels';
import { useCallback } from 'react';

declare global {
    interface Window {
        Ultrade: {
            [key in WalletKeys]?: UseWalletSign | PeraWalletSign | DeflyWalletSign;
        };
    }
}

export enum WalletKeys {
    UseWallet = 'txnlab-use-wallet',
    Pera = 'PeraWallet.Wallet',
    Defly = 'DeflyWallet.Wallet',
    MyAlgo = 'MyAlgoWallet',
};  

type UseWalletSign = (transactions: Uint8Array[], indexesToSign?: number[], returnGroup?: boolean) => Promise<Uint8Array[]>;
type PeraWalletSign = (txGroups: SignerTransaction[][], signerAddress?: string | undefined) => Promise<Uint8Array[]>;
type DeflyWalletSign = (txGroups: DeflySignerTransaction[][], signerAddress?: string | undefined) => Promise<Uint8Array[]>;

export const createUltradeObj = () => {
    if (!window.Ultrade) {
        window.Ultrade = {};
    }
}

export const useProvideWallet = () => {
    const setSignFunction = useCallback((walletProvider: WalletKeys, sign: UseWalletSign | PeraWalletSign | DeflyWalletSign) => {
        window.Ultrade[WalletKeys.UseWallet] = undefined;
        window.Ultrade[WalletKeys.Pera] = undefined;
        window.Ultrade[WalletKeys.Defly] = undefined;
        window.Ultrade[WalletKeys.MyAlgo] = undefined;
        window.Ultrade[walletProvider] = sign;
    }, []);

    const clearSignFunction = useCallback((walletProvider: WalletKeys) => {
        window.Ultrade[walletProvider] = undefined;
    }, [])

    return { setSignFunction, clearSignFunction };
}
