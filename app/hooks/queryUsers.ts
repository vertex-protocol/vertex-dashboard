export function queryUsers(data: any) {
  const users: any = [];

  data?.forEach((obj: any) => {
    if (obj?.hasOwnProperty('cumulative_users')) {
      const user = obj.cumulative_users;
      users.push(user);
    }
  });

  return users;
}
