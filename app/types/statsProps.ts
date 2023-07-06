export interface StatsProps {
  snapshots:
    | {
        timestamp: number;
        cumulative_users: number;
        daily_active_users: number;
        cumulative_volume: { [key: string]: string };
        cumulative_taker_fees: { [key: string]: string };
        cumulative_sequencer_fees: { [key: string]: string };
        cumulative_maker_fees: { [key: string]: string };
        cumulative_trades: { [key: string]: number };
        cumulative_liquidation_amount: { [key: string]: string };
        open_interest: { [key: string]: string };
        total_deposits: { [key: string]: string };
        total_borrows: { [key: string]: string };
        funding_rates: { [key: string]: string };
        deposit_rates: { [key: string]: string };
        borrow_rates: { [key: string]: string };
      }[]
    | null;
  loading: boolean;
  error: boolean;
}
