import './globals.css';
import { Providers } from './redux/provider';
import { DM_Sans } from 'next/font/google';

const DMSans = DM_Sans({
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

export const metadata = {
  title: 'Vertex Stats',
  description: 'A dashboard of Vertex Protocol',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={DMSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
