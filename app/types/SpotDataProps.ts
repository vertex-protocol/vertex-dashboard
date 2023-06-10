export interface SpotDataProps {
  data: any;
  market: string;
  setSpotVol: React.Dispatch<React.SetStateAction<number[]>>;
  setDailySpotVol: React.Dispatch<React.SetStateAction<number[]>>;
  setSpotTrades: React.Dispatch<React.SetStateAction<number[]>>;
  setDailySpotTrades: React.Dispatch<React.SetStateAction<number[]>>;
}
