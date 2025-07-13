import { useAbstraxionAccount, useAbstraxionClient, useAbstraxionSigningClient } from "@burnt-labs/abstraxion";
import { ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { useCallback, useEffect, useState } from "react";
import { CONTRACT_ADDRESS } from "../app/constants/contract";
import { NewVoting, Voting } from "../types/voting";

export const useVoting = () => {
    const { data: account } = useAbstraxionAccount();
    const { client: queryClient } = useAbstraxionClient();
    const { client, logout } = useAbstraxionSigningClient();

    const [votings, setVotings] = useState<Voting[]>([]);
    const [loading, setLoading] = useState(false);
    const [executeResult, setExecuteResult] = useState<ExecuteResult | undefined>(undefined);

    const fetchVotings = useCallback(async () => {
        console.log("📥 Fetching votings...");
        try {
            const response = await queryClient?.queryContractSmart(CONTRACT_ADDRESS, {
                get_list_voting: {},
            });

            const votingsArray = response?.votings || [];
            setVotings(votingsArray);
            console.log("✅ Fetched votings:", votingsArray);
        } catch (err) {
            console.error("❌ Error fetching votings:", err);
            setVotings([]);
        }
    }, [queryClient]);

    const createVoting = async (newVoting: NewVoting) => {
        if (!account?.bech32Address || !client) return;

        const msg = {
            create_voting: {
                title: newVoting.title,
                description: newVoting.description,
            },
        };

        setLoading(true);
        try {
            const res = await client.execute(account.bech32Address, CONTRACT_ADDRESS, msg, "auto");
            setExecuteResult(res);
            console.log("🆕 Voting created:", res);
            await fetchVotings();
            return res;
        } catch (err) {
            console.error("❌ Error creating voting:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (account?.bech32Address) {
            console.log("✅ Wallet connected:", account.bech32Address);
            fetchVotings();
        } else {
            console.log("🔌 Wallet not connected");
        }
    }, [account?.bech32Address, fetchVotings]);

    return {
        account,
        votings,
        loading,
        executeResult,
        logout,
        fetchVotings,
        createVoting,
    };
};

