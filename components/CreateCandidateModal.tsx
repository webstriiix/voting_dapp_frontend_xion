// components/CreateCandidateModal.tsx
import React, { useState } from "react";
import { Button, Dialog, DialogContent, Input } from "@burnt-labs/ui";
import Image from "next/image";

export const CreateCandidateModal = ({
    isOpen,
    onClose,
    onCreate
}: {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (name: string, image: string) => void;
}) => {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [imageError, setImageError] = useState(false);

    const handleSubmit = () => {
        onCreate(name, image);
        setName("");
        setImage("");
        setImageError(false);
        onClose();
    };

    const handleCancel = () => {
        setName("");
        setImage("");
        setImageError(false);
        onClose();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImage(e.target.value);
        setImageError(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md mx-auto rounded-2xl border border-gray-200">
                <div className="p-6">
                    <h2 className="text-xl font-semibold mb-6">Create New Candidate</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Candidate Name
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <Input
                                placeholder="Enter candidate name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Image URL
                                <span className="text-gray-400 text-xs ml-2">(optional)</span>
                            </label>
                            <Input
                                placeholder="https://example.com/image.jpg"
                                value={image}
                                onChange={handleImageChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                            />
                        </div>

                        {/* Image Preview */}
                        {image && !imageError && (
                            <div className="mt-4">
                                <label className="block text-sm font-medium mb-2">Preview</label>
                                <div className="flex justify-center">
                                    <Image
                                        src={image}
                                        alt="Candidate preview"
                                        width={80}
                                        height={80}
                                        className="rounded-lg border border-gray-200 object-cover"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Image Error */}
                        {image && imageError && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                <div className="flex items-center text-red-700 text-sm">
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    Unable to load image. Please check the URL.
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4">
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
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-black hover:bg-gray-800 text-white'
                                    }`}
                            >
                                Create Candidate
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
