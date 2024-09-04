import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';

// import { PostHogProvider } from '~/utils/posthog/provider';
// import { TRPCProvider } from '~/utils/trpc/client';

import '~/styles/globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s - HabitFlame',
    default: 'HabitFlame - Light the fire, start new habits',
  },
  description: 'Creating new habits',
  // icons: {
  //   icon: [
  //     { url: '/icons/icon-48.png', sizes: '48x48', type: 'image/png' },
  //     { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
  //     { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
  //   ],
  //   apple: [{ url: '/icons/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  // },
};

type LayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className="h-full">
        <body
          className={`${GeistSans.variable} ${GeistMono.variable} h-full bg-white font-sans antialiased`}
        >
          {children}
          {/* <TRPCProvider>{children}</TRPCProvider> */}
        </body>
    </html>
  );
}
