import React, { useEffect, useRef } from 'react';
type UltradeProps = {
  mode?: Modes;
  src?: 'https://ultrade.org' | 'https://tetstnet.ultrade.org';
  walletInheritance?: boolean;
  symbol?: string; 
}

export enum Modes {
  WIDGET = 'widget',
};

const Api: { [name:string]: string } = {
  'https://ultrade.org': '',
  'https://tetstnet.ultrade.org': 'https://api.testnet.ultradedev.net',
  'https://dev.ultradedev.net': 'https://api.dev.ultradedev.net',
  'https://dev4.ultradedev.net': 'https://api.dev4.ultradedev.net',
  'https://stage2.ultradedev.net': 'https://api.stage.ultradedev.net',
  'http://localhost:3001': 'http://localhost:5001',
};

export const Ultrade = ({mode, src='https://ultrade.org', walletInheritance, symbol}: UltradeProps) => {
  const apiUrl = Api[src];
  if (!apiUrl) throw new Error('Wrong Ultrade url');
  
  const snippetUrl = new URL(`${apiUrl}/wl/snippet`);
  if (walletInheritance) snippetUrl.searchParams.set('walletInheritance', 'true');
  if (mode) snippetUrl.searchParams.set('mode', mode);
  if (symbol) snippetUrl.searchParams.set('symbol', symbol);

  const ultradeRootRef = useRef<HTMLDivElement>();
  useEffect(() => {
    const script = document.createElement('script');
    script.src = snippetUrl.href;
    script.async = true;

    ultradeRootRef.current.appendChild(script);

    return () => {ultradeRootRef.current && ultradeRootRef.current.removeChild(script)};
  }, [snippetUrl]);

  return <div id='ultrade-root' style={{width: '100%', height: '100%'}} ref={ultradeRootRef}></div>
};
