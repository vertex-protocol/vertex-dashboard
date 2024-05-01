import Image from 'next/image';
import vertexLogo from '../../public/vertex-logo.svg';

export default function NavBar() {
  return (
    <nav className="flex justify-between py-4 px-4 md:px-10 bg-gray-3 border-b border-gray-2 text-white">
      <div className="flex gap-x-2">
        <a href="https://vertexprotocol.com" target="_blank">
          <Image src={vertexLogo} alt="vertex-logo" width={100} />
        </a>
        <span>on Arbitrum</span>
      </div>
      <div className="flex gap-4">
        <a href="https://app.vertexprotocol.com/markets" target="_blank">
          App
        </a>
        <a
          href="https://vertex-protocol.gitbook.io/docs/getting-started/overview"
          target="_blank"
        >
          Docs
        </a>
      </div>
    </nav>
  );
}
