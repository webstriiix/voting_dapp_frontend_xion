"use client";
import { Abstraxion, useModal } from "@burnt-labs/abstraxion";
import { Button, Dialog, DialogContent } from "@burnt-labs/ui";
import React from "react";

interface WalletConnectProps {
  account: any;
  isWalletModalOpen: boolean;
  setIsWalletModalOpen: (open: boolean) => void;
}

export const WalletConnect: React.FC<WalletConnectProps> = ({
  account,
  isWalletModalOpen,
  setIsWalletModalOpen,
}) => {
  const [, setShowModal] = useModal();

  return (
    <div className="max-w-md mx-auto mt-20">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-black mb-4">
          Decentralized Voting
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Connect your wallet to participate in secure blockchain voting
        </p>
      </div>

      {/* Connect Wallet Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-black mb-2">Connect Wallet</h2>
          <p className="text-gray-500 text-sm">
            Secure connection to XION network required
          </p>
        </div>
        
        <Button 
          onClick={() => setIsWalletModalOpen(true)}
          className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 rounded-xl transition-colors"
        >
          {account?.bech32Address
            ? `${account.bech32Address.slice(0, 6)}...${account.bech32Address.slice(-4)}`
            : "Connect Wallet"}
        </Button>
      </div>

      {/* Wallet Modal */}
      <Dialog open={isWalletModalOpen} onOpenChange={setIsWalletModalOpen}>
        <DialogContent className="max-w-sm mx-auto rounded-2xl border border-gray-200">
          <div className="flex flex-col items-center gap-6 p-6">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-black mb-2">Connect Your Wallet</h2>
              <p className="text-sm text-gray-500">
                To create or participate in votings, connect your wallet to the XION network.
              </p>
            </div>
            <div className="w-full space-y-3">
              <Button 
                onClick={() => setShowModal(true)}
                className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 rounded-xl"
              >
                CONNECT WALLET
              </Button>
              <br />
              <Button 
                onClick={() => setIsWalletModalOpen(false)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-black font-medium py-3 rounded-xl"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Abstraxion onClose={() => setShowModal(false)} />
    </div>
  );
};