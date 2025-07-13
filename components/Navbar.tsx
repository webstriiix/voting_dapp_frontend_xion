"use client";

import { Button } from "@burnt-labs/ui";
import { useEffect, useState } from "react";
import { useVoting } from "@/hooks/useVoting";
import Link from "next/link";

export const Navbar = () => {
    const { account, votings, loading, logout } = useVoting();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (isMobileMenuOpen && !target.closest('.mobile-menu-container')) {
                setIsMobileMenuOpen(false);
            }
        };

        if (isMobileMenuOpen) {
            document.addEventListener('click', handleClickOutside);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    return (
        <>
            <div className="flex justify-between items-center mb-8">
                <div className="flex-1">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">

                        <Link href="/" className="text-black hover:underline">
                            Votings
                        </Link>                    </h1>
                </div>

                <div className="hidden md:flex items-center gap-4">
                    {logout && (
                        <Button
                            disabled={loading}
                            onClick={logout}
                            className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-xl font-medium transition-all duration-200 shadow-sm border border-gray-200 hover:shadow-md"
                        >
                            Logout
                        </Button>
                    )}
                </div>

                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 rounded-xl hover:bg-white/80 transition-all duration-200 shadow-sm border border-gray-200 bg-white"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className={`w-6 h-6 text-gray-700 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMobileMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                    <div className="mobile-menu-container fixed top-0 right-0 h-screen w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-out">
                        <div className="flex flex-col h-full overflow-hidden">
                            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
                                <h3 className="text-lg font-semibold text-gray-900">Menu</h3>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 rounded-lg hover:bg-gray-100"
                                    aria-label="Close menu"
                                >
                                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M6 18L18 6M6 6l12 12" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Connected Wallet</h4>
                                    <p className="text-xs text-gray-600 font-mono break-all">
                                        {account?.bech32Address}
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <div className="p-3 bg-gray-50 rounded-xl">
                                        <h5 className="text-sm font-medium text-gray-900 mb-1">Governance</h5>
                                        <p className="text-xs text-gray-600">Participate in decentralized decision making</p>
                                    </div>

                                    <div className="p-3 bg-gray-50 rounded-xl">
                                        <h5 className="text-sm font-medium text-gray-900 mb-1">Active Votings</h5>
                                        <p className="text-xs text-gray-600">{votings?.length || 0} proposals available</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 border-t border-gray-100 bg-white sticky bottom-0 z-10">
                                {logout && (
                                    <Button
                                        disabled={loading}
                                        onClick={() => {
                                            logout();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                                    >
                                        {loading ? 'Logging out...' : 'Logout'}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

