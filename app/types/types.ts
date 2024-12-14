export interface PageProps {
  interval: string;
  setInterval: (interval: string) => void;
  intervalText: string;
  intervalSubText: string;
}

export type ChainType = 'arbitrum' | 'mantle' | 'sei' | 'base' | 'sonic';

export type NetworkType = 'mainnet' | 'testnet';
