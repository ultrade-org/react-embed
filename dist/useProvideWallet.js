"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useProvideWallet = exports.createUltradeObj = exports.WalletKeys = void 0;
const react_1 = require("react");
var WalletKeys;
(function (WalletKeys) {
    WalletKeys["UseWallet"] = "txnlab-use-wallet";
    WalletKeys["Pera"] = "PeraWallet.Wallet";
    WalletKeys["Defly"] = "DeflyWallet.Wallet";
})(WalletKeys = exports.WalletKeys || (exports.WalletKeys = {}));
;
const createUltradeObj = () => {
    if (!window.Ultrade) {
        window.Ultrade = {};
    }
};
exports.createUltradeObj = createUltradeObj;
const useProvideWallet = () => {
    const setSignFunction = (0, react_1.useCallback)((walletProvider, sign) => {
        window.Ultrade[walletProvider] = sign;
    }, []);
    const clearSignFunction = (0, react_1.useCallback)((walletProvider) => {
        window.Ultrade[walletProvider] = undefined;
    }, []);
    return { setSignFunction, clearSignFunction };
};
exports.useProvideWallet = useProvideWallet;
