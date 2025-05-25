"use client";

import Link from "next/link";

export default function Home() {
    return (
        <main className="relative z-10 text-white px-6">
            {/* Hero Section */}
            <section className="max-w-5xl mx-auto pt-4 pb-8 md:pt-20 md:pb-24 lg:pt-20 lg:pb-32 text-center">
                <h1 className="text-2xl md:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                    Connect With Your Family Like Never Before
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                        Easily create, manage, and share your family tree with loved ones across generations.
                </p>
                <div className="flex justify-center gap-4">
                    <Link
                        href="/signup"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-all"
                    >
                        Get Started
                    </Link>
                    <Link
                        href="/login"
                        className="px-6 py-3 border border-gray-600 hover:border-gray-400 rounded-lg font-medium transition-all"
                    >
                        Log In
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="max-w-5xl mx-auto pb-4 md:pb-16 lg:pb-32">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="bg-gray-900/50 p-6 rounded-lg backdrop-blur-sm">
                        <h3 className="text-xl font-semibold mb-2">Build Your Family Tree</h3>
                        <p className="text-gray-400">
                            Visualize relationships, add members, and keep track of generations.
                        </p>
                    </div>
                    <div className="bg-gray-900/50 p-6 rounded-lg backdrop-blur-sm">
                        <h3 className="text-xl font-semibold mb-2">Share Securely</h3>
                        <p className="text-gray-400">
                            Invite relatives to view or edit parts of your tree with privacy controls.
                        </p>
                    </div>
                    <div className="bg-gray-900/50 p-6 rounded-lg backdrop-blur-sm">
                        <h3 className="text-xl font-semibold mb-2">Preserve Memories</h3>
                        <p className="text-gray-400">
                            Upload photos, stories, and documents to honor your heritage.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-3xl mx-auto text-center pb-16 lg:pb-32">
                <h2 className="text-2xl md:text-4xl font-bold mb-6">
                    Ready to Rediscover Your Roots?
                </h2>
                <p className="text-gray-300 mb-8">
                    Start building your family record today — free to join, easy to use.
                </p>
                <Link
                    href="/signup"
                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg font-semibold text-white text-lg hover:from-blue-600 hover:to-indigo-600 transition-all"
                >
                    Join Now
                </Link>
            </section>
        </main>
    );
}