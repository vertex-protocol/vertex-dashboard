export interface PageProps {
  interval: string;
  setInterval: (interval: string) => void;
  intervalText: string;
  intervalSubText: string;
}

export type ChainType = 'arbitrum' | 'mantle' | 'sei' | 'base';

export type NetworkType = 'mainnet' | 'testnet';
