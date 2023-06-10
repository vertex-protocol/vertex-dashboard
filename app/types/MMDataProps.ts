export interface MMDataProps {
  data: any;
  market: string;
  setDeposits: React.Dispatch<React.SetStateAction<number[]>>;
  setDailyDeposits: React.Dispatch<React.SetStateAction<number[]>>;
  setBorrows: React.Dispatch<React.SetStateAction<number[]>>;
  setDailyBorrows: React.Dispatch<React.SetStateAction<number[]>>;
  setDepositRate: React.Dispatch<React.SetStateAction<number[]>>;
  setBorrowRate: React.Dispatch<React.SetStateAction<number[]>>;
}
