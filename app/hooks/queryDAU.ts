export function queryDAU(data: any) {
  if (!data) {
    return 0;
  }
  return data.snapshots[0].daily_active_users;
}
