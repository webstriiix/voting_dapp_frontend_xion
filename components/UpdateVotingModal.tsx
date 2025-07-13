// components/UpdateVotingModal.tsx
import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogContent, Input } from "@burnt-labs/ui";
import { Voting } from "../types/voting";

export const UpdateVotingModal = ({ 
  isOpen, 
  onClose, 
  voting, 
  onUpdate 
}: {
  isOpen: boolean;
  onClose: () => void;
  voting: Voting | null;
  onUpdate: (title: string, description: string) => void;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (voting) {
      setTitle(voting.title);
      setDescription(voting.description);
    }
  }, [voting]);

  const handleSubmit = () => {
    onUpdate(title, description);
    onClose();
  };

  const handleCancel = () => {
    // Reset form when canceling
    if (voting) {
      setTitle(voting.title);
      setDescription(voting.description);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto rounded-2xl border border-gray-200">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Update Voting</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input
                placeholder="Enter voting title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                placeholder="Enter voting description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
              />
            </div>

            <div className="flex justify-between mt-6">
              <Button 
                onClick={handleCancel}
                className="bg-gray-300 hover:bg-gray-400 text-black font-medium py-2 px-4 rounded-lg"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={!title.trim() || !description.trim()}
                className={`font-medium py-2 px-4 rounded-lg ${
                  !title.trim() || !description.trim()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-black hover:bg-gray-800 text-white'
                }`}
              >
                Update Voting
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
