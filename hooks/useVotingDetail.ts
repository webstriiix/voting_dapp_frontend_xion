// hooks/useVotingDetail.ts
import { useAbstraxionAccount, useAbstraxionClient, useAbstraxionSigningClient } from "@burnt-labs/abstraxion";
import { ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { useEffect, useState, useCallback } from "react";
import { CONTRACT_ADDRESS } from "../app/constants/contract";
import { Voting, Candidate } from "../types/voting";

export function useVotingDetail(id: string) {
    const { data: account } = useAbstraxionAccount();
    const { client: queryClient } = useAbstraxionClient();
    const { client } = useAbstraxionSigningClient();

    const [voting, setVoting] = useState<Voting | null>(null);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [executeResult, setExecuteResult] = useState<ExecuteResult | undefined>(undefined);

    // Fetch voting details
    const fetchVotingDetail = useCallback(async () => {
        if (!queryClient || !id) return;

        console.log(`📥 Fetching voting detail for ID: ${id}...`);
        setLoading(true);
        setError(null);

        try {
            const response = await queryClient.queryContractSmart(CONTRACT_ADDRESS, {
                get_voting: { voting_id: parseInt(id) },
            });

            if (response?.voting) {
                setVoting(response.voting);
                console.log("✅ Fetched voting detail:", response.voting);
            } else {
                throw new Error("Voting not found");
            }
        } catch (err) {
            console.error("❌ Error fetching voting detail:", err);
            setError(err instanceof Error ? err.message : "Failed to fetch voting detail");
            setVoting(null);
        } finally {
            setLoading(false);
        }
    }, [queryClient, id]);

    // Fetch candidates for this voting
    const fetchCandidates = useCallback(async () => {
        if (!queryClient || !id) return;

        console.log(`📥 Fetching candidates for voting ID: ${id}...`);

        try {
            const response = await queryClient.queryContractSmart(CONTRACT_ADDRESS, {
                list_candidates: { voting_id: parseInt(id) },
            });

            const candidatesArray = response?.candidates || [];
            setCandidates(candidatesArray);
            console.log("✅ Fetched candidates:", candidatesArray);
        } catch (err) {
            console.error("❌ Error fetching candidates:", err);
            setCandidates([]);
        }
    }, [queryClient, id]);

    // Add candidate function
    const addCandidate = useCallback(async (name: string, image_addr: string) => {
        if (!account?.bech32Address || !client || !id) {
            console.warn("❌ Cannot add candidate: wallet not connected or missing data");
            return;
        }

        if (!name.trim()) {
            console.warn("❌ Cannot add candidate: name is required");
            return;
        }

        const msg = {
            add_candidate: {
                voting_id: parseInt(id),
                name: name.trim(),
                image_addr: image_addr.trim() || null,
            },
        };

        console.log(`🆕 Adding candidate: ${name}...`);
        setLoading(true);

        try {
            const res = await client.execute(account.bech32Address, CONTRACT_ADDRESS, msg, "auto");
            setExecuteResult(res);
            console.log("✅ Candidate added successfully:", res);

            // Refresh candidates list
            await fetchCandidates();
            return res;
        } catch (err) {
            console.error("❌ Error adding candidate:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [account?.bech32Address, client, id, fetchCandidates]);

    // Update voting function
    const updateVoting = useCallback(async (title: string, description: string) => {
        if (!account?.bech32Address || !client || !id) {
            console.warn("❌ Cannot update voting: wallet not connected or missing data");
            return;
        }

        if (!title.trim() || !description.trim()) {
            console.warn("❌ Cannot update voting: title and description are required");
            return;
        }

        const msg = {
            update_voting: {
                voting_id: parseInt(id),
                title: title.trim(),
                description: description.trim(),
            },
        };

        console.log(`✏️ Updating voting: ${title}...`);
        setLoading(true);

        try {
            const res = await client.execute(account.bech32Address, CONTRACT_ADDRESS, msg, "auto");
            setExecuteResult(res);
            console.log("✅ Voting updated successfully:", res);

            // Refresh voting detail
            await fetchVotingDetail();
            return res;
        } catch (err) {
            console.error("❌ Error updating voting:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [account?.bech32Address, client, id, fetchVotingDetail]);

    // Remove candidate function 
    const removeCandidate = useCallback(async (candidateId: string) => {
        if (!account?.bech32Address || !client || !id) {
            console.warn("❌ Cannot remove candidate: wallet not connected or missing data");
            return;
        }

        const msg = {
            remove_candidate: {
                voting_id: parseInt(id),
                candidate_id: parseInt(candidateId),
            },
        };

        console.log(`🗑️ Removing candidate: ${candidateId}...`);
        setLoading(true);

        try {
            const res = await client.execute(account.bech32Address, CONTRACT_ADDRESS, msg, "auto");
            setExecuteResult(res);
            console.log("✅ Candidate removed successfully:", res);

            // Refresh candidates list
            await fetchCandidates();
            return res;
        } catch (err) {
            console.error("❌ Error removing candidate:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [account?.bech32Address, client, id, fetchCandidates]);

    // Vote Candidate
    const voteForCandidate = useCallback(
        async (votingId: number, candidateId: number, onSuccess?: () => void) => {
            if (!account?.bech32Address || !client) {
                console.warn("❌ Cannot vote: wallet not connected or missing data");
                return;
            }

            const msg = {
                vote: {
                    voting_id: votingId,
                    candidate_id: candidateId,
                },
            };

            console.log(`🗳️ Voting for candidate ${candidateId} in voting ${votingId}...`);
            setLoading(true);

            try {
                const res = await client.execute(account.bech32Address, CONTRACT_ADDRESS, msg, "auto");
                setExecuteResult(res);
                console.log("✅ Vote successful:", res);

                if (onSuccess) onSuccess();
                return res;
            } catch (err) {
                console.error("❌ Error voting:", err);
                alert("Failed to vote: " + (err || "Unknown error"));
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [account?.bech32Address, client]
    );


    const updateCandidate = useCallback(
    async (candidateId: number, name: string, image_addr: string) => {
        if (!account?.bech32Address || !client || !id) return;

        const msg = {
            update_candidate: {
                candidate_id: candidateId,
                name,
                image_addr,
            },
        };

        try {
            const res = await client.execute(account.bech32Address, CONTRACT_ADDRESS, msg, "auto");
            await fetchCandidates();
            return res;
        } catch (err) {
            console.error("❌ Failed to update candidate:", err);
            throw err;
        }
    },
    [account?.bech32Address, client, id, fetchCandidates]
);


    // Utility functions
    const getCandidateCount = useCallback(() => {
        return candidates.length;
    }, [candidates.length]);

    const refreshData = useCallback(async () => {
        await Promise.all([fetchVotingDetail(), fetchCandidates()]);
    }, [fetchVotingDetail, fetchCandidates]);

    // Initial data fetch
    useEffect(() => {
        if (account?.bech32Address && queryClient && id) {
            console.log(`✅ Wallet connected: ${account.bech32Address}, fetching data for voting: ${id}`);
            refreshData();
        } else {
            console.log("🔌 Wallet not connected or missing voting ID");
            setLoading(false);
        }
    }, [account?.bech32Address, queryClient, id, refreshData]);

    return {
        // Data
        voting,
        candidates,
        loading,
        error,
        executeResult,
        account,

        // Actions
        addCandidate,
        updateVoting,
        updateCandidate,
        removeCandidate,
        voteForCandidate,


        // Utilities
        getCandidateCount,
        refreshData,
        fetchVotingDetail,
        fetchCandidates,
    };
}
