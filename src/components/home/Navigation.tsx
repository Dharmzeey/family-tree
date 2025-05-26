import { fetchRolesCookies, removeAllTokens } from "@/utils/cookies";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaHome, FaBell, FaSearch, FaUserPlus, FaAddressBook } from "react-icons/fa";
import { FaUserPen, FaCircleInfo, FaRightFromBracket } from "react-icons/fa6";

export default function Navigation() {

    const [roles, setRoles] = useState<{ is_author: boolean, is_handler: boolean }>({ is_author: false, is_handler: false });
    const [loggedIn, setLoggedIn] = useState(false)
    const [familyId, setFamilyId] = useState<string | undefined>(undefined)
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
        router.replace("/")
    }

    useEffect(() => {
        // This will delay a bit so as for the app to get if the user is logged in or not
        setTimeout(() => setLoggedIn(true), 1000)
    }, [])

    useEffect(() => {
        const getUser = localStorage.getItem('user') || undefined;
        if (getUser !== undefined) {
            const user = JSON.parse(getUser);
            // This will extract family ID from the local storage for a non author and a non handler
            if (user.family_id) setFamilyId(user.family_id)
        }
    }, [])

    if (!loggedIn) {
        return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;
    }

    return (
        <>
            {/* Navigation Menu */}
            <div className="mt-8 bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10 overflow-hidden">
                <nav className="grid grid-cols-1 divide-y divide-white/10">
                    <Link
                        href="/profile"
                        className="px-6 py-4 hover:bg-white/10 transition-colors flex items-center gap-3 text-white"
                    >
                        <FaHome className="w-5 h-5" />
                        <span>Home</span>
                    </Link>
                    <Link
                        href="/profile/edit"
                        className="px-6 py-4 hover:bg-white/10 transition-colors flex items-center gap-3 text-white"
                    >
                        <FaUserPen className="w-5 h-5" />
                        <span>Edit Profile</span>
                    </Link>
                    <Link
                        href="/notifications"
                        className="px-6 py-4 hover:bg-white/10 transition-colors flex items-center gap-3 text-white"
                    >
                        <FaBell className="w-5 h-5" />
                        <span>Notifications</span>
                    </Link>
                    <Link
                        href="/relatives/search"
                        className="px-6 py-4 hover:bg-white/10 transition-colors flex items-center gap-3 text-white"
                    >
                        <FaSearch className="w-5 h-5" />
                        <span>Search Relatives</span>
                    </Link>
                    <Link
                        href="/relatives/add-offline"
                        className="px-6 py-4 hover:bg-white/10 transition-colors flex items-center gap-3 text-white"
                    >
                        <FaUserPlus className="w-5 h-5" />
                        <span>Add Offline Relatives</span>
                    </Link>


                    {roles.is_author || roles.is_handler || familyId != undefined ? (
                        <Link
                            href="/family"
                            className="px-6 py-4 hover:bg-white/10 transition-colors flex items-center gap-3 text-white"
                        >
                            <FaCircleInfo className="w-5 h-5" />
                            <span>Family Information</span>
                        </Link>
                    )
                        :
                        <Link
                            href="/family/include"
                            className="px-6 py-4 hover:bg-white/10 transition-colors flex items-center gap-3 text-white"
                        >
                            <FaAddressBook className="w-5 h-5" />
                            <span>Add Family</span>
                        </Link>

                    }
                    <button
                        onClick={logout}
                        className="px-6 py-4 hover:bg-white/10 transition-colors flex items-center gap-3 text-white w-full text-left"
                    >
                        <FaRightFromBracket className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </nav>
            </div>
        </>
    )
}