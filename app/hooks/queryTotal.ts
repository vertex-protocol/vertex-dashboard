export function queryTotal(data: any, type: string) {
  const result: number[] = [];

  for (const key in data) {
    const obj = data[key];
    const sum = obj[type].reduce((acc: number, val: number) => acc + val, 0);
    result.push(sum);
  }

  return result;
}
