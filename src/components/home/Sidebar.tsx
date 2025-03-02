"use client";
import { fetchRolesCookies, removeAllTokens } from "@/utils/cookies";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Sidebar() {
    const [roles, setRoles] = useState<{ is_author: boolean, is_handler: boolean }>({ is_author: false, is_handler: false });
    const [loggedIn, setLoggedIn] = useState(false)
    const [familyId, setFamilyId] = useState<string>('')
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

    useEffect(() => {
        // This will delay a bit so as for the app to get if the user is logged in or not
        setTimeout(() => setLoggedIn(true), 2000)
    }, [])

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        setFamilyId(user.family_id)
    },[])

    return (
        <>
            <div className="h-full max-h-[100vh] min-w-48 flex justify-center items-center leading-10 px-3">
                {
                    !loggedIn ?
                        <p>...</p>
                        :
                        <ul>
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li>
                                <Link href="/profile/edit">Edit Profile</Link>
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
                            {(roles.is_author || roles.is_handler) || (familyId) ? (
                                <li>
                                    <Link href="/families">Family Information</Link>
                                </li>
                            )
                                :
                                <li>
                                    <Link href="/families/include">Add Family</Link>
                                </li>
                            }
                            <li>
                                <button onClick={logout}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                }
            </div>
        </>
    )
}