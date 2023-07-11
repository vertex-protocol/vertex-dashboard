export interface PerpDataProps {
  data: any;
  market: string;
  setPerpVol: React.Dispatch<React.SetStateAction<number[]>>;
  setDailyPerpVol: React.Dispatch<React.SetStateAction<number[]>>;
  setOpenInt: React.Dispatch<React.SetStateAction<number[]>>;
  setDailyOpenInt: React.Dispatch<React.SetStateAction<number[]>>;
  setPerpTrades: React.Dispatch<React.SetStateAction<number[]>>;
  setDailyPerpTrades: React.Dispatch<React.SetStateAction<number[]>>;
  setHourlyFunding: React.Dispatch<React.SetStateAction<number[]>>;
  setDailyFunding: React.Dispatch<React.SetStateAction<number[]>>;
  setAnnualFunding: React.Dispatch<React.SetStateAction<number[]>>;
  filterdProducts: any;
}
