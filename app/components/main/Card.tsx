import numeral from 'numeral';
import Spinner from './Spinner';
import infoSvg from '../../public/information-circle.svg';
import Image from 'next/image';
import { Tooltip } from 'react-tooltip';

interface Card {
  title: string;
  stat: any;
  daily?: number;
  currency: boolean;
  loading: boolean;
  tooltipContent?: string;
}

export default function Card({
  title,
  stat,
  daily,
  currency,
  loading,
  tooltipContent,
}: Card) {
  const isTooltip = !!tooltipContent;

  const cardContent = () => {
    return (
      <div className="pl-6 py-6">
        <div className="flex gap-4 items-center">
          <p className="text-2xl text-white font-semibold">
            {currency
              ? numeral(stat).format('$0.00a')
              : numeral(stat).format('0,0')}
          </p>
        </div>
        <div className="flex gap-x-1.5 items-center">
          <p className="text-gray-1 font-medium mt-1">{title}</p>
          {isTooltip && (
            <Image
              src={infoSvg}
              alt="info"
              width={18}
              height={18}
              data-tooltip-id="my-tooltip"
              data-tooltip-content="24h period starts at 0:00 UTC."
            />
          )}
          <Tooltip
            id="my-tooltip"
            place="bottom"
            style={{
              backgroundColor: 'rgb(42, 42, 47)',
              color: '#A2A2A6',
              opacity: 1,
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-3 border border-gray-2 rounded h-28">
      {loading ? <Spinner className="h-full" /> : cardContent()}
    </div>
  );
}
