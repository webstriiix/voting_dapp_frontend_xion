"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useVotingDetail } from "../../../hooks/useVotingDetail";
import { CreateCandidateModal } from "../../../components/CreateCandidateModal";
import { UpdateVotingModal } from "../../../components/UpdateVotingModal";
import { Button } from "@burnt-labs/ui";
import { Navbar } from "../../../components/Navbar";
import { Candidate } from "@/types/voting";
import { UpdateCandidateModal } from "@/components/UpdateCandidateModal";
import { useRouter } from "next/navigation";


export default function VotingDetailPage() {
    const { id } = useParams() as { id: string };
    const { voting, candidates, loading, addCandidate, updateVoting, voteForCandidate, fetchCandidates, account, updateCandidate, removeCandidate } = useVotingDetail(id);
    const [openCreate, setOpenCreate] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (!account?.bech32Address) {
            router.push("/"); // or "/login" if you have one
        }
    }, [account?.bech32Address, router]);

    if (!account?.bech32Address) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-500 text-lg">Redirecting...</p>
            </div>
        );
    }


    if (loading || !voting) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    const isOwner = voting.creator === account?.bech32Address;


    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto p-6 space-y-8">
                <Navbar />
                {/* Header Section */}
                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-black">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">{voting.title}</h1>
                    <p className="text-gray-700 text-lg leading-relaxed">{voting.description}</p>
                </div>

                {/* Action Buttons */}
                {isOwner && (

                    <div className="flex gap-4">
                        <Button
                            onClick={() => setOpenCreate(true)}
                            className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            + Create Candidate
                        </Button>
                        <Button
                            onClick={() => setOpenUpdate(true)}
                            className="px-6 py-2 bg-white text-black border-2 border-black rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200"
                        >
                            ✏️ Update Voting
                        </Button>
                    </div>
                )}

                {/* Divider */}
                <hr className="border-gray-300" />

                {/* Candidates Section */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                        <span className="mr-2">🗳️</span>
                        Candidates
                        <span className="ml-3 bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                            {candidates.length}
                        </span>
                    </h2>

                    {candidates.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-6xl mb-4">📋</div>
                            <p className="text-gray-500 text-lg mb-2">No candidates yet</p>
                            <p className="text-gray-400">Click Create Candidate to add the first candidate</p>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {candidates.map((c) => (
                                <div
                                    key={c.id}
                                    className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 group"
                                >
                                    {/* Candidate Image */}
                                    <div className="flex justify-center mb-4">
                                        <div className="relative">
                                            {c.image_addr ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={c.image_addr}
                                                    alt={c.name}
                                                    className="w-50 max-h-50 object-contain rounded-2xl border-4 border-gray-100 group-hover:border-black transition-colors duration-300"
                                                />
                                            ) : null}
                                            {/* Default Avatar Fallback */}
                                            <div
                                                className={`w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl border-4 border-gray-100 group-hover:border-black transition-colors duration-300 flex items-center justify-center ${c.image_addr ? 'hidden' : 'flex'}`}
                                            >
                                                <svg className="w-10 h-10 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            </div>

                                        </div>
                                    </div>

                                    {/* Candidate Name */}
                                    <div className="text-center mb-4">
                                        <h3 className="font-semibold text-gray-900 text-lg mb-1 group-hover:text-black transition-colors duration-300">
                                            {c.name}
                                        </h3>
                                        <p className="text-gray-500 text-sm">Candidate</p>
                                        <p className="text-sm text-gray-400 mt-1"> Total votings: {c.vote_count} </p>
                                    </div>

                                    {/* Vote Button */}
                                    <div className="mt-4 ">
                                        <button
                                            onClick={() => voteForCandidate(Number(voting.id), c.id, fetchCandidates)}
                                            className="w-full  !bg-black !text-gray-200 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-300"
                                        >
                                            Vote for {c.name.split(' ')[0]}
                                        </button>
                                        {isOwner && (
                                            <div className="mt-2 flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedCandidate(c);
                                                        setOpenUpdateModal(true);
                                                    }}
                                                    className="w-1/2 !bg-black !text-gray-200 py-2 px-4 rounded-xl text-sm"
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    onClick={() => removeCandidate(c.id.toString())}
                                                    className="w-1/2 !bg-black !text-gray-200 py-2 px-4 rounded-xl text-sm"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>)}
                </div>
            </div>

            {/* Modal Overlays */}
            {openCreate && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
                        {/* Backdrop */}
                        <div
                            onClick={() => setOpenCreate(false)}
                        ></div>

                        {/* Modal Content */}
                        <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <CreateCandidateModal
                                isOpen={openCreate}
                                onClose={() => setOpenCreate(false)}
                                onCreate={addCandidate}
                            />
                        </div>
                    </div>
                </div>
            )}

            {openUpdate && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                            onClick={() => setOpenUpdate(false)}
                        ></div>

                        {/* Modal Content */}
                        <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <UpdateVotingModal
                                isOpen={openUpdate}
                                onClose={() => setOpenUpdate(false)}
                                voting={voting}
                                onUpdate={updateVoting}
                            />
                        </div>
                    </div>
                </div>
            )}

            {selectedCandidate && (
                <UpdateCandidateModal
                    isOpen={openUpdateModal}
                    onClose={() => setOpenUpdateModal(false)}
                    candidate={selectedCandidate}
                    onUpdate={updateCandidate}
                />
            )}

        </div>
    );
}
