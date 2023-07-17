import StartData from '../data/StartData.json';

export function queryUsers(data: any) {
  const users: any = [];
  const startUser = StartData.cumulative_users;

  data?.snapshots.forEach((obj: any) => {
    if (obj?.hasOwnProperty('cumulative_users')) {
      let user = obj.cumulative_users - startUser;
      if (user < 0) {
        user = 0;
      }
      users.push(user);
    }
  });

  return users.reverse();
}
