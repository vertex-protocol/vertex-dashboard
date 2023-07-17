export interface MMDataProps {
  snapshotData: any;
  market: string;
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
