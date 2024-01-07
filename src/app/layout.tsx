import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ReactQueryProviders from './ReactQueryProvider';
import { Container } from '@mui/material';
import { main } from './page.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ecommerce',
  description: 'Ecommerce website',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className={main}>
          <ReactQueryProviders>
            <Container>{children}</Container>
          </ReactQueryProviders>
        </main>
      </body>
    </html>
  );
}
