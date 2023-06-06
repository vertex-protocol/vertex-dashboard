export function queryDaily(data: any) {
  const result: number[] = [];

  for (let i = 1; i < data.length; i++) {
    const difference = data[i] - data[i - 1];
    result.push(difference);
  }

  return result;
}
