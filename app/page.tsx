"use client";

import { useState } from "react";
import { Button } from "@burnt-labs/ui";
import { WalletConnect } from "../components/WalletConnect";
import { useVoting } from "../hooks/useVoting";
import { CreateVotingModal } from "../components/CreateVotingModal";
import { VotingList } from "../components/VotingList";
import { Navbar } from "../components/Navbar";

export default function Home(): JSX.Element {
    const { account, votings, loading, createVoting } = useVoting();
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [isWalletModalOpen, setIsWalletModalOpen] = useState<boolean>(false);

    // Show wallet connection screen if not logged in
    if (!account?.bech32Address) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
                <WalletConnect
                    account={account}
                    isWalletModalOpen={isWalletModalOpen}
                    setIsWalletModalOpen={setIsWalletModalOpen}
                />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
            <div className="max-w-6xl mx-auto">
                {/* Navbar Header */}
                <Navbar />

                {/* Create Voting Modal */}
                <CreateVotingModal
                    isOpen={isCreating}
                    onOpenChange={setIsCreating}
                    onCreateVoting={createVoting}
                    loading={loading}
                />

                {/* Voting Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 m-5">
                    <VotingList
                        votings={votings}
                        onCreateClick={() => setIsCreating(true)}
                    />
                </div>
            </div>
        </main>
    );
}

