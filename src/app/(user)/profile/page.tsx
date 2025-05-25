"use client";

import { fetchProfileApi } from "@/lib/api/profile";
import { GetProfileData } from "@/types/profile";
import { useRouter } from "next/navigation";
import useUserStore from "@/stores/userStore";
import { useEffect, useState } from "react";
import UserCard from "@/components/profile/userCard";


export default function ProfilePage() {
    const { user, setUser } = useUserStore();
    const [error, setError] = useState<string | null>(null);

    const router = useRouter()

    useEffect(() => {

        const fetchAndSetProfile = async () => {
            const fetchProfile = await fetchProfileApi();

            if (fetchProfile.status === 404) {
                router.push("/profile/create");
            }
            else if (fetchProfile.status === 200) {
                const profile: GetProfileData = fetchProfile.data as unknown as GetProfileData;
                setUser(profile);
            }
            else if (fetchProfile.status === 500) {
                setError(fetchProfile.error!)
            }

        };

        if (!user) {
            fetchAndSetProfile();
        }
    }, [user, router, setUser]);

    if (error) return <div className="flex justify-center items-center">{error}</div>
    return (
        <>
            {
                user ? (
                    <div className="flex justify-center items-center">
                        <UserCard user={user} />
                    </div>
                ) : (
                    <div className="flex justify-center items-center">Loading...</div>
                )
            }
        </>
    );
}
