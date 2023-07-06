import SpinnerSvg from '../../public/Spinner.svg';
import Image from 'next/image';

export default function Spinner() {
  return (
    <div className="text-gray-1 flex items-center justify-center h-64">
      <div className="animate-spin">
        <Image src={SpinnerSvg} alt="spinner" />
      </div>
    </div>
  );
}
