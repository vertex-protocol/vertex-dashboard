export function queryUsers(data: any) {
  const users: any = [];

  data?.forEach((obj: any) => {
    if (obj?.hasOwnProperty('cumulative_users')) {
      let user = obj.cumulative_users;
      if (user < 0) {
        user = 0;
      }
      users.push(user);
    }
  });

  return users.reverse();
}
