import React, { useEffect, useRef } from 'react';
type UltradeProps = {
  mode?: Modes;
  src?: 'https://ultrade.org' | 'https://tetstnet.ultrade.org';
  walletInheritance?: boolean;
}

export enum Modes {
  WIDGET = 'widget',
};

const Api: { [name:string]: string } = {
  'https://ultrade.org': '',
  'https://tetstnet.ultrade.org': 'https://testnet-apigw.ultradedev.net',
  'https://dev.ultradedev.net': 'https://dev-apigw.ultradedev.net',
  'https://dev4.ultradedev.net': 'https://dev4-apigw.ultradedev.net',
  'https://stage2.ultradedev.net': 'https://stage2-apigw.ultradedev.net',
  'http://localhost:3001': 'http://localhost:5001',
};

export const Ultrade = ({mode, src='https://ultrade.org', walletInheritance}: UltradeProps) => {
  const apiUrl = Api[src];
  if (!apiUrl) throw new Error('Wrong Ultrade url');
  
  let snippetUrl = `${apiUrl}/wl/snippet?test=test`;
  if (walletInheritance) snippetUrl += '&walletInheritance=true';
  if (mode) snippetUrl += `&mode=${mode}`;

  const ultradeRootRef = useRef<HTMLDivElement>();
  useEffect(() => {
    const script = document.createElement('script');
    script.src = snippetUrl;
    script.async = true;

    ultradeRootRef.current.appendChild(script);

    return () => {ultradeRootRef.current && ultradeRootRef.current.removeChild(script)};
  }, [snippetUrl]);

  return <div id='ultrade-root' style={{width: '100%', height: '100%'}} ref={ultradeRootRef}></div>
};
