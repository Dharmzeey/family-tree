"use client";

import { fetchProfileApi } from "@/lib/api/profile";
import { ProfileData } from "@/types/profile";
import { useRouter } from "next/navigation";
import useUserStore from "@/stores/userStore";
import { useEffect } from "react";
import UserCard from "@/components/profile/userCard";


export default function Home() {
    const { user, setUser } = useUserStore();

    const router = useRouter()

    const fetchAndSetProfile = async () => {
        try {
            const fetchProfile = await fetchProfileApi();

            if (fetchProfile.status === 404) {
                router.push("/profile/create");
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
            {
                user ? (
                    <div className="flex justify-center items-center">
                        <UserCard user={user} />
                    </div>
                ) : (
                    <h1 className="flex justify-center items-center">Loading...</h1>
                )
            }
        </>
    );
}
