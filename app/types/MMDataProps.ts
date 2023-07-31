export interface MMDataProps {
  snapshotData: any;
  market: string;
  setAllTVL: React.Dispatch<React.SetStateAction<number[]>>;
  setAllDailyDeposits: React.Dispatch<React.SetStateAction<number[]>>;
  setAllDailyWithdraws: React.Dispatch<React.SetStateAction<number[]>>;
  setTVL: React.Dispatch<React.SetStateAction<number[]>>;
  setNetFlows: React.Dispatch<React.SetStateAction<number[]>>;
  setDeposits: React.Dispatch<React.SetStateAction<number[]>>;
  setDailyDeposits: React.Dispatch<React.SetStateAction<number[]>>;
  setWithdraws: React.Dispatch<React.SetStateAction<number[]>>;
  setDailyWithdraws: React.Dispatch<React.SetStateAction<number[]>>;
  setDepositRate: React.Dispatch<React.SetStateAction<number[]>>;
  setBorrowRate: React.Dispatch<React.SetStateAction<number[]>>;
  filterdProducts: any;
  prices: any;
}
