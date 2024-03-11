import Head from 'next/head';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { StoreProvider } from '@/stores/StoreProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Task Management Application',
  description: 'An application for managing tasks',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <body className={`bg-slate-100 ${inter.className}`}>
        <StoreProvider>
          <main className="container">{children}</main>
        </StoreProvider>
      </body>
    </html>
  );
}

