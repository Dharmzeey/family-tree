"use client";

import Sidebar from "@/components/home/Sidebar";
import BackgroundGradient from "@/components/layout/BgGradient";
import { fetchProfileApi } from "@/lib/api/profile";
import { ProfileData } from "@/types/profile";
import { redirect } from "next/navigation";
import useUserStore from "@/stores/userStore";
import { useEffect } from "react";
import UserCard from "@/components/profile/userCard";

export default function Home() {
    const { user, setUser } = useUserStore();

    const fetchAndSetProfile = async () => {
        try {
            const fetchProfile = await fetchProfileApi();

            if (fetchProfile.status === 401) {
                redirect("/login");
            } else if (fetchProfile.status === 404) {
                redirect("/profile/create");
            }

            const profile: ProfileData = fetchProfile.data;
            setUser(profile);
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    useEffect(() => {
        if (!user) {
            fetchAndSetProfile();
        }
    }, [user]);

    return (
        <>
            <div className="h-screen bg-[#091325] relative overflow-hidden">
                <BackgroundGradient />
                <div className="h-full grid grid-cols-[1fr_4fr] ">
                    <Sidebar />
                    {
                        user ? (
                            <UserCard user={user} />
                        ) : (
                            <h1>Loading...</h1>
                        )
                    }
                </div>
            </div>
        </>
    );
}
