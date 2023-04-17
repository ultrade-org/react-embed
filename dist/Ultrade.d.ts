/// <reference types="react" />
type UltradeProps = {
    mode?: Modes;
    src?: 'https://ultrade.org' | 'https://tetstnet.ultrade.org';
    walletInheritance?: boolean;
};
export declare enum Modes {
    WIDGET = "widget"
}
export declare const Ultrade: ({ mode, src, walletInheritance }: UltradeProps) => JSX.Element;
export {};
