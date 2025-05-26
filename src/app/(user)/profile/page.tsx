"use client";

import { fetchProfileApi } from "@/lib/api/profile";
import { GetProfileData } from "@/types/profile";
import { useRouter } from "next/navigation";
import useUserStore from "@/stores/userStore";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/home/Navigation";

export default function ProfilePage() {
    const { user, setUser } = useUserStore();
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchAndSetProfile = async () => {
            const fetchProfile = await fetchProfileApi();

            if (fetchProfile.status === 404) {
                router.push("/profile/create");
            } else if (fetchProfile.status === 200) {
                const profile: GetProfileData = fetchProfile.data as unknown as GetProfileData;
                setUser(profile);
            } else if (fetchProfile.status === 500) {
                setError(fetchProfile.error!);
            }
        };

        if (!user) {
            fetchAndSetProfile();
        }
    }, [user, router, setUser]);

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
    }

    if (!user) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    const hasImage = user?.picture && !user.picture.includes("default.jpg");

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Profile Header */}
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/10">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                        {/* Avatar Section */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300"></div>
                            {hasImage ? (
                                <Image
                                    src={user.picture}
                                    alt={`${user.first_name}'s profile`}
                                    width={150}
                                    height={150}
                                    className="relative z-10 rounded-full w-32 h-32 object-cover border-4 border-white/20 hover:border-blue-400 transition-all"
                                />
                            ) : (
                                <div className="relative z-10 rounded-full w-32 h-32 bg-gray-700 flex items-center justify-center text-4xl font-bold text-white border-4 border-white/20">
                                    {user.first_name.charAt(0)}
                                </div>
                            )}
                        </div>

                        {/* User Info Section */}
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-xl md:text-3xl font-bold text-white">
                                {user.first_name} {user.other_name}
                                {user.last_name && <span className="text-blue-300"> {user.last_name}</span>}
                            </h1>

                            <div className="mt-2 text-xl text-blue-300 font-medium">
                                {user.lineage_name || "No lineage assigned"}
                            </div>

                            <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                                <Link
                                    href={`/relatives`}
                                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all hover:shadow-lg hover:-translate-y-0.5"
                                >
                                    View Family Tree
                                </Link>
                                <Link
                                    href={`/profile/edit`}
                                    className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full transition-all hover:shadow-lg hover:-translate-y-0.5"
                                >
                                    Edit Profile
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* About Section */}
                <div className="mt-8 bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/10">
                    <h2 className="text-xl font-semibold text-white mb-4">About</h2>
                    <p className="text-gray-300">
                        {/* Add your about content here */}
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.
                    </p>
                </div>
                <Navigation />
            </div>
        </div>
    );
}
