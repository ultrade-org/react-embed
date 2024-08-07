"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ultrade = exports.Modes = void 0;
const react_1 = __importStar(require("react"));
var Modes;
(function (Modes) {
    Modes["WIDGET"] = "widget";
})(Modes = exports.Modes || (exports.Modes = {}));
;
const Api = {
    'https://app.ultrade.org': 'https://api.ultrade.org',
    'https://testnet.ultrade.org': 'https://api.testnet.ultrade.org',
};
const Ultrade = ({ mode, src = 'https://app.ultrade.org', walletInheritance, symbol }) => {
    const apiUrl = Api[src];
    if (!apiUrl)
        throw new Error('Wrong Ultrade url');
    const snippetUrl = new URL(`${apiUrl}/wl/snippet`);
    if (walletInheritance)
        snippetUrl.searchParams.set('walletInheritance', 'true');
    if (mode)
        snippetUrl.searchParams.set('mode', mode);
    if (symbol)
        snippetUrl.searchParams.set('symbol', symbol);
    const queryParameters = new URLSearchParams(window.location.search);
    const selectedMarket = queryParameters.get("selectedMarket");
    if (selectedMarket)
        snippetUrl.searchParams.set('selectedMarket', selectedMarket);
    const ultradeRootRef = (0, react_1.useRef)();
    (0, react_1.useEffect)(() => {
        const script = document.createElement('script');
        script.src = snippetUrl.href;
        script.async = true;
        ultradeRootRef.current.appendChild(script);
        return () => { ultradeRootRef.current && ultradeRootRef.current.removeChild(script); };
    }, [snippetUrl]);
    return react_1.default.createElement("div", { id: 'ultrade-root', style: { width: '100%', height: '100%' }, ref: ultradeRootRef });
};
exports.Ultrade = Ultrade;
