// TODO: format values
// 2 decimal points
// K, M, B
// conditionaly render $
// conditionaly render green or red

interface Card {
  title: string;
  stat: number;
  daily: number;
}

export default function Card({ title, stat, daily }: Card) {
  return (
    <div className="bg-gray-3 border border-gray-2 rounded">
      <div className="pl-6 py-6">
        <div className="flex gap-4 items-center">
          <p className="text-2xl text-white font-semibold">${stat}B</p>
          <p className="text-green">+${daily}M</p>
        </div>
        <p className="text-gray-1 font-medium mt-1">{title}</p>
      </div>
    </div>
  );
}
