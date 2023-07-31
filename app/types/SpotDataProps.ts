export interface SpotDataProps {
  snapshotData: any;
  market: string;
  setAllSpotVol: React.Dispatch<React.SetStateAction<number[]>>;
  setAllDailySpotVol: React.Dispatch<React.SetStateAction<number[]>>;
  setAllDailySpotTrades: React.Dispatch<React.SetStateAction<number[]>>;
  setSpotVol: React.Dispatch<React.SetStateAction<number[]>>;
  setDailySpotVol: React.Dispatch<React.SetStateAction<number[]>>;
  setSpotTrades: React.Dispatch<React.SetStateAction<number[]>>;
  setDailySpotTrades: React.Dispatch<React.SetStateAction<number[]>>;
  filterdProducts: any;
}
