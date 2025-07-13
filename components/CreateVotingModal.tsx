import { Button, Dialog, DialogContent, DialogTrigger, Input } from "@burnt-labs/ui";
import { ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import React, { useState } from "react";
import { NewVoting } from "../types/voting";

interface CreateVotingModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateVoting: (voting: NewVoting) => Promise<ExecuteResult | undefined>;
  loading: boolean;
}

export const CreateVotingModal: React.FC<CreateVotingModalProps> = ({
  isOpen,
  onOpenChange,
  onCreateVoting,
  loading,
}) => {
  const [newVoting, setNewVoting] = useState<NewVoting>({ title: "", description: "" });

  const handleSubmit = async () => {
    try {
      await onCreateVoting(newVoting);
      setNewVoting({ title: "", description: "" });
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to create voting:", error);
    }
  };

 return (
  <Dialog open={isOpen} onOpenChange={onOpenChange}>
    <DialogTrigger asChild>
      <Button className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-medium transition-colors">
        Create Voting
      </Button>
    </DialogTrigger>
    <DialogContent className="max-w-md mx-auto rounded-2xl border border-gray-200">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">Create New Voting</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <Input
              placeholder="Enter voting title"
              value={newVoting.title}
              onChange={(e) =>
                setNewVoting({ ...newVoting, title: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <Input
              placeholder="Enter voting description"
              value={newVoting.description}
              onChange={(e) =>
                setNewVoting({
                  ...newVoting,
                  description: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
          <div className="flex justify-between mt-6">
            <Button 
              onClick={() => onOpenChange(false)}
              className="bg-gray-300 hover:bg-gray-400 text-black font-medium py-2 px-4 rounded-lg"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={loading}
              className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg"
            >
              {loading ? "Creating..." : "Create Voting"}
            </Button>
          </div>

        </div>
      </div>
    </DialogContent>
  </Dialog>
);

};
