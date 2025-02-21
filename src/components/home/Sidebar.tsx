"use client";
import { fetchRolesCookies, removeAllTokens } from "@/utils/cookies";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Sidebar() {
    const [roles, setRoles] = useState<{ is_author: boolean, is_handler: boolean }>({ is_author: false, is_handler: false });
    const router = useRouter()

    useEffect(() => {
        async function fetchRoles() {
            const roles = await fetchRolesCookies();
            setRoles(roles);
        }
        fetchRoles();
    }, []);

    const logout = async () => {
        await removeAllTokens();
        localStorage.removeItem('user')
        router.replace("/login")
    }

    return (
        <>
            <div className="h-full max-h-[100vh] min-w-48 flex justify-center items-center leading-10 px-3">
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/notifications">Notifications</Link>
                    </li>
                    <li>
                        <Link href="/relatives">View Relatives</Link>
                    </li>
                    <li>
                        <Link href="/relatives/search">Search Relatives</Link>
                    </li>
                    <li>
                        <Link href="/relatives/add">Add Offline Relatives</Link>
                    </li>
                    {(roles.is_author || roles.is_handler) && (
                        <li>
                            <Link href="/families">Families</Link>
                        </li>
                    )}
                    <li>
                        <button onClick={logout}>
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </>
    )
}