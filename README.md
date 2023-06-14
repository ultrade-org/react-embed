# ULTRADE REACT EMBED
## _Easiest way to ebmbed the Ultrade in a react application_

[![N|Solid](https://testnet.ultrade.org/Theme%3DLight.svg)](https://ultrade.org)

## Installation


```sh
npm i @ultrade/react-embed
```


## Usage

### Basic implementation
```js
import { Ultrade } from '@ultrade/react-embed';

const YourApp = () => {
    return (
        <>
            <YourAppTag/>
            <Ultrade/>
        </>
    );
}
```

### Widget mode
By default the tag will render the full Ultrade exchange interface. Putting the following attribute will render a widget - a simple buy/sell interface.

```js
<Ultrade mode='widget'/>
```

### Connection to testnet 
```js
<Ultrade src={'https://testnet.ultrade.org'}/>
```

> Note: `src='<URL_TO_ULTRADE_APPLICATION>'` is needed only for TestNet not for MainNet.
#

## Styles 
Ultrade component will fill it's container size. You can controll the size by it's container size like shown below. The widget mode is optimized for this sizes "width: '380px' height: '625px".

```js
<div width='100%' height='80%'>
    <Ultrade/>
<div/>
```
#

## Wallet inheritance

#### Optional: you can inherit wallet connection from your application. Use "useProvideWallet" hook and a walletInheritance property:
> The `setSignFunction` is used to enable the aplication to send transactions to your wallet provider. The function accepts 2 parameters: first an identifier for your wallet provider, second is passing a sign function from your wallet provider.
```js
import { useProvideWallet } from "@ultrade/react-embed";
const { setSignFunction } = useProvideWallet();
setSignFunction('<Key from WalletKeys specifying your wallet provider>', signFunction)
<Ultrade walletInheritance={true}/>
```
> `WalletKeys` is a TypeScript enum. For JavaScript you can provide any key directly without using enum.
Examples:
#
```js
//js
setSignFunction('txnlab-use-wallet', signTransactions);
setSignFunction('PeraWallet.Wallet', (tx) => peraWallet.signTransaction(tx));
setSignFunction('DeflyWallet.Wallet', (tx) => deflyWallet.signTransaction(tx));
setSignFunction('MyAlgoWallet', (tx) => myAlgoSign(tx));
//ts
import { WalletKeys } from "@ultrade/react-embed";
setSignFunction(WalletKeys.UseWallet, signTransactions);
setSignFunction(WalletKeys.Pera, (tx) => peraWallet.signTransaction(tx));
setSignFunction(WalletKeys.Defly, (tx) => deflyWallet.signTransaction(tx));
setSignFunction(WalletKeys.MyAlgo, (tx) => myAlgoSign(tx));
```
#
`clearSignFunction` is used to remove a provided signFunction.
Use it if you want to switch from one wallet provider to another one.
#

## Usage example
```js
import { WalletKeys, useProvideWallet, Ultrade } from "@ultrade/react-embed"; //import Ultrade 
import { useEffect, useMemo } from "react"; //import React

const YourApp = () => {
    const peraWallet = useMemo(() => new PeraWalletConnect({...}), []); //create wallet provider
    const { setSignFunction, clearSignFunction } = useProvideWallet(); //use Ultrade hook
    
    useEffect(() => {
        setSignFunction(WalletKeys.Pera, (tx) => peraWallet.signTransaction(tx)); //provide sign function to Ultrade App
        return () => clearSignFunction(WalletKeys.Pera); //remove sign function in case if your component was unmounted
    }, [peraWallet, setSignFunction, clearSignFunction]);
 
    return (
        <>
            <YourAppTag/> 
            <div width='100%' height='80%'> 
                <Ultrade  //render Ultrade application
                    mode='widget' 
                    src={'https://testnet.ultrade.org'} 
                    walletInheritance={true}
                />
            <div/>
        </>
  );
}
```


## License
MIT
