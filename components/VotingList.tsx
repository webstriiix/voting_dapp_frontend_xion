import { Button } from "@burnt-labs/ui";
import React from "react";
import { Voting } from "../types/voting";
import { VotingCard } from "./VotingCard";

interface VotingListProps {
    votings: Voting[];
    onCreateClick: () => void;
}

export const VotingList: React.FC<VotingListProps> = ({ votings, onCreateClick }) => {
    if (votings.length === 0) {
        return (
            <div className="col-span-full">
                <div className="bg-white rounded-2xl border-2 border-dashed border-gray-300 p-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-black mb-2">No votings found</h3>
                    <p className="text-gray-500 mb-4">Get started by creating your first voting proposal</p>
                    <Button
                        onClick={onCreateClick}
                        className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-medium"
                    >
                        Create First Voting
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <>
            {votings.map((voting) => (
                <VotingCard key={voting.id} voting={voting} />
            ))}
        </>
    );
};

