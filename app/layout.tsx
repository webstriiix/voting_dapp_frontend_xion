// app/layout.tsx
"use client";
import { AbstraxionProvider } from "@burnt-labs/abstraxion";
import "@burnt-labs/abstraxion/dist/index.css";
import "@burnt-labs/ui/dist/index.css";
import './globals.css';


const config = {
  treasury: process.env.NEX_PUBLIC_TREASURY!,
  rpcUrl: "https://rpc.xion-testnet-2.burnt.com/",
  restUrl: "https://api.xion-testnet-2.burnt.com/"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >
        <AbstraxionProvider config={config}>
          {children}
        </AbstraxionProvider>
      </body>
    </html>
  )
}
