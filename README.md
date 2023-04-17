# ULTRADE REACT EMBED
## _Easyest way to ebmbed the Ultrade in a react application_

[![N|Solid](https://testnet.ultrade.org/Theme%3DLight.svg)](https://ultrade.org)

## Features

- feature 1
- feature 2

## Installation


```sh
npm i @ultrade/react-embed
```


## Usage


```js
import { Ultrade } from '@ultrade/react-embed';

const YourApp = () => {
    return (
        <>
            <SomeYourAppTag/>
            <Ultrade src={'https://testnet.ultrade.org'}/>
        </>
    );
}
```
> Note: `src='<URL_TO_ULTRADE_APPLICATION>'` is needed only if you want to use testnet version of ultrade application.

#### If you want to inherit wallet connection from your application use this: 
```js
import { Ultrade } from '@ultrade/react-embed';
import { WalletKeys, useProvideWallet } from "alexeyby-react-embed";
import { useEffect, useMemo } from "react";

const YourApp = () => {
    const someWallet = useMemo(() => new SomeWalletConnect({...}), []);
    const { setSignFunction, clearSignFunction } = useProvideWallet();
    
    useEffect(() => {
        setSignFunction(WalletKeys.Pera, (tx) => someWallet.signTransaction(tx));
        return () => clearSignFunction(WalletKeys.Pera);
    }, [peraWallet, setSignFunction, clearSignFunction]);
 
    return (
        <>
            <SomeYourAppTag/>
            <Ultrade walletInheritance={true}/>
        </>
  );
}
```

> Here `WalletKeys` is enum You can use it in TypeScript and if you use Java Script you can provide any key from that enum directly without using it. Like that `setSignFunction('PeraWallet.Wallet', yourSignFn)`.

```
enum WalletKeys {
    UseWallet = 'txnlab-use-wallet',
    Pera = 'PeraWallet.Wallet',
    Defly = 'DeflyWallet.Wallet',
};  
```
> And a setSignFunction is a function that accespt as a second argument sign function from your wallet provider like that
```js
const { signTransactions } = useWallet(); //For useWallet
const deflyWallet = new DeflyWalletConnect({...}); //For defly
const peraWallet = new PeraWalletConnect({...}); //For pera

//arrow function here is to not lose context of the wallet
setSignFunction(WalletKeys.Pera, (tx) => peraWallet.signTransaction(tx));
setSignFunction(WalletKeys.Defly, (tx) => deflyWallet.signTransaction(tx));
setSignFunction(WalletKeys.UseWallet, signTransactions);
```

## License

MIT???
