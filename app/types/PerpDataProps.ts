export interface PerpDataProps {
  snapshotData: any;
  market: string;
  setAllPerpVol: React.Dispatch<React.SetStateAction<number[]>>;
  setAllDailyPerpVol: React.Dispatch<React.SetStateAction<number[]>>;
  setAllOpenInt: React.Dispatch<React.SetStateAction<number[]>>;
  setAllDailyPerpTrades: React.Dispatch<React.SetStateAction<number[]>>;
  setPerpVol: React.Dispatch<React.SetStateAction<number[]>>;
  setDailyPerpVol: React.Dispatch<React.SetStateAction<number[]>>;
  setOpenInt: React.Dispatch<React.SetStateAction<number[]>>;
  setPerpTrades: React.Dispatch<React.SetStateAction<number[]>>;
  setDailyPerpTrades: React.Dispatch<React.SetStateAction<number[]>>;
  setHourlyFunding: React.Dispatch<React.SetStateAction<number[]>>;
  setDailyFunding: React.Dispatch<React.SetStateAction<number[]>>;
  setAnnualFunding: React.Dispatch<React.SetStateAction<number[]>>;
  filterdProducts: any;
}
