import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogContent, Input } from "@burnt-labs/ui";
import { Candidate } from "../types/voting";

export const UpdateCandidateModal = ({
    isOpen,
    onClose,
    candidate,
    onUpdate,
}: {
    isOpen: boolean;
    onClose: () => void;
    candidate: Candidate;
    onUpdate: (id: number, name: string, image: string) => void;
}) => {
    const [name, setName] = useState(candidate.name);
    const [image, setImage] = useState(candidate.image_addr);
    const [imageError, setImageError] = useState(false);

    // Update local state when modal opens with new candidate
    useEffect(() => {
        setName(candidate.name);
        setImage(candidate.image_addr);
        setImageError(false);
    }, [candidate]);

    const handleSubmit = () => {
        onUpdate(candidate.id, name.trim(), image.trim());
        onClose();
    };

    const handleCancel = () => {
        setName(candidate.name);
        setImage(candidate.image_addr);
        setImageError(false);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md mx-auto rounded-2xl border border-gray-200">
                <div className="p-6">
                    <h2 className="text-xl font-semibold mb-6">Update Candidate</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Candidate Name <span className="text-red-500 ml-1">*</span>
                            </label>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Candidate name"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Image URL <span className="text-gray-400 text-xs ml-2">(optional)</span>
                            </label>
                            <Input
                                value={image}
                                onChange={(e) => {
                                    setImage(e.target.value);
                                    setImageError(false);
                                }}
                                placeholder="https://..."
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        {image && !imageError && (
                            // eslint-disable-next-line @next/next/no-img-element

                            <div className="mt-4">
                                <label className="block text-sm font-medium mb-2">Preview</label>
                                <div className="flex justify-center">
                                    <img
                                        src={image}
                                        alt="Candidate preview"
                                        className="max-w-80 max-h-80 rounded-lg border border-gray-200 object-cover"
                                    />
                                </div>
                            </div>
                        )}

                        {image && imageError && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                <div className="text-red-700 text-sm">
                                    ❌ Unable to load image. Please check the URL.
                                </div>
                            </div>
                        )}

                        <div className="flex justify-between mt-6 gap-4">
                            <Button
                                onClick={handleCancel}
                                className="bg-gray-300 hover:bg-gray-400 text-black font-medium py-2 px-4 rounded-lg w-full sm:w-auto"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                disabled={!name.trim()}
                                className={`font-medium py-2 px-4 rounded-lg w-full sm:w-auto ${!name.trim()
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-black hover:bg-gray-800 text-white"
                                    }`}
                            >
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

