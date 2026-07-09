import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import './globals.css';

export const metadata: Metadata = {
  title: 'Memento',
  icons: {
    icon: '/M.png',
    shortcut: '/M.png',
    apple: '/M.png',
  },
  description: 'Álbuns colaborativos instantâneos para eventos.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
