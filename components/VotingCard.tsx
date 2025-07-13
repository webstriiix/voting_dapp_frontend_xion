import React from "react";
import { useRouter } from "next/navigation";
import { Voting } from "../types/voting";

interface VotingCardProps {
    voting: Voting;
}

export const VotingCard: React.FC<VotingCardProps> = ({ voting }) => {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(`/voting/${voting.id}`)}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
        >
            {/* Card Header */}
            <div className="flex items-start justify-between mb-4">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {voting.active ? "Active" : "Closed"}
                </span>
            </div>

            {/* Card Content */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-black mb-2 line-clamp-2">
                    {voting.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                    {voting.description}
                </p>
                <p className="text-gray-600 text-xs mt-2 truncate">{voting.creator}</p>
            </div>

            {/* Card Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${voting.active ? "bg-green-500" : "bg-gray-400"}`}></div>
                    <span className="text-xs text-gray-500">{voting.active ? "Live" : "Ended"}</span>
                </div>
                <button className="text-black hover:text-gray-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

