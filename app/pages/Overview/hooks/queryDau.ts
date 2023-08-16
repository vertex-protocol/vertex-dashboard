export function queryDau(data: any) {
  if (!data) {
    return 0;
  }
  const users: any = [];

  data?.forEach((obj: any) => {
    if (obj?.hasOwnProperty('daily_active_users')) {
      const user = obj.daily_active_users;
      users.push(user);
    }
  });

  users.pop();
  return users.reverse();
}
