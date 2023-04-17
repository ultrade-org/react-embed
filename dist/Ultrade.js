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
    'https://ultrade.org': '',
    'https://tetstnet.ultrade.org': 'https://testnet-apigw.ultradedev.net',
    'https://dev.ultradedev.net': 'https://dev-apigw.ultradedev.net',
    'https://dev4.ultradedev.net': 'https://dev4-apigw.ultradedev.net',
    'https://stage2.ultradedev.net': 'https://stage2-apigw.ultradedev.net',
    'http://localhost:3001': 'http://localhost:5001',
};
const Ultrade = ({ mode, src = 'https://ultrade.org', walletInheritance }) => {
    const apiUrl = Api[src];
    if (!apiUrl)
        throw new Error('Wrong Ultrade url');
    let snippetUrl = `${apiUrl}/wl/snippet?test=test`;
    if (walletInheritance)
        snippetUrl += '&walletInheritance=true';
    if (mode)
        snippetUrl += `&mode=${mode}`;
    const ultradeRootRef = (0, react_1.useRef)();
    (0, react_1.useEffect)(() => {
        const script = document.createElement('script');
        script.src = snippetUrl;
        script.async = true;
        ultradeRootRef.current.appendChild(script);
        return () => { ultradeRootRef.current && ultradeRootRef.current.removeChild(script); };
    }, [snippetUrl]);
    return react_1.default.createElement("div", { id: 'ultrade-root', style: { width: '100%', height: '100%' }, ref: ultradeRootRef });
};
exports.Ultrade = Ultrade;
