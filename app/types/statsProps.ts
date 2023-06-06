export interface StatsProps {
  data:
    | {
        timestamp: number;
        cumulative_users: number;
        cumulative_volumes: number[];
        cumulative_fees: number[];
        cumulative_trades: number[];
        cumulative_liquidations: number[];
        open_interests: number[];
        total_deposits: number[];
        total_borrows: number[];
        funding_rates: number[][];
        deposit_rates: number[];
        borrow_rates: number[];
      }[]
    | null;
  loading: boolean;
  error: boolean;
}
