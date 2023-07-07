import numeral from 'numeral';

interface Card {
  title: string;
  stat: any;
  daily: number;
  currency: boolean;
}

export default function Card({ title, stat, daily, currency }: Card) {
  return (
    <div className="bg-gray-3 border border-gray-2 rounded">
      <div className="pl-6 py-6">
        <div className="flex gap-4 items-center">
          <p className="text-2xl text-white font-semibold">
            {currency
              ? numeral(stat).format('$0.00a')
              : numeral(stat).format('0.a')}
          </p>
        </div>
        <p className="text-gray-1 font-medium mt-1">{title}</p>
      </div>
    </div>
  );
}
