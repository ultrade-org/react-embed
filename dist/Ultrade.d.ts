/// <reference types="react" />
type UltradeProps = {
    mode?: Modes;
    src?: 'https://app.ultrade.org' | 'https://testnet.ultrade.org';
    walletInheritance?: boolean;
    symbol?: string;
};
export declare enum Modes {
    WIDGET = "widget"
}
export declare const Ultrade: ({ mode, src, walletInheritance, symbol }: UltradeProps) => JSX.Element;
export {};
