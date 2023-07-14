export interface MMDataProps {
  snapshotData: any;
  market: string;
  setTVL: React.Dispatch<React.SetStateAction<number[]>>;
  setNetFlows: React.Dispatch<React.SetStateAction<number[]>>;
  setBorrows: React.Dispatch<React.SetStateAction<number[]>>;
  setDailyBorrows: React.Dispatch<React.SetStateAction<number[]>>;
  setDepositRate: React.Dispatch<React.SetStateAction<number[]>>;
  setBorrowRate: React.Dispatch<React.SetStateAction<number[]>>;
  filterdProducts: any;
  prices: any;
}
