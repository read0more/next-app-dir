import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ReactQueryProviders from './ReactQueryProvider';
import { Container } from '@mui/material';
import { main } from './page.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ecommerce',
  description: 'Ecommerce website',
  icons: {
    icon: '/log.svg',
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
        <ReactQueryProviders>
          <Container>
            <Navbar />
            <main className={main}>{children}</main>
            <Footer />
          </Container>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
