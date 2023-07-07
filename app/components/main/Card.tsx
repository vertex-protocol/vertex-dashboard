import numeral from 'numeral';
import Spinner from './Spinner';

interface Card {
  title: string;
  stat: any;
  daily?: number;
  currency: boolean;
  loading: boolean;
}

export default function Card({ title, stat, daily, currency, loading }: Card) {
  const cardContent = () => {
    return (
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
    );
  };

  return (
    <div className="bg-gray-3 border border-gray-2 rounded h-28">
      {loading ? <Spinner className="h-full" /> : cardContent()}
    </div>
  );
}
