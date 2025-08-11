import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import {AppWrapper} from '@/context'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100','200','300','400','500','600','700','800','900'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: "ByteBox — All Your Files, One Box.",
  description: "ByteBox — A modern drive for your files — safe, simple, and always in sync.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-poppins antialiased`}
      >
        <AppWrapper>
          {children}
        </AppWrapper>
      </body>
    </html>
  );
}
