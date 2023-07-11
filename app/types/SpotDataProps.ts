export interface SpotDataProps {
  snapshotData: any;
  market: string;
  setSpotVol: React.Dispatch<React.SetStateAction<number[]>>;
  setDailySpotVol: React.Dispatch<React.SetStateAction<number[]>>;
  setSpotTrades: React.Dispatch<React.SetStateAction<number[]>>;
  setDailySpotTrades: React.Dispatch<React.SetStateAction<number[]>>;
  filterdProducts: any;
}
