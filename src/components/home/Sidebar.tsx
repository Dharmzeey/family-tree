import Link from "next/link";

export default function Sidebar() {
    return (
        <>
            <div className="border-r border-gray-400">
                <div className="h-full flex justify-center items-center leading-10">
                    <ul>
                        <li>
                            <Link href="/">Home</Link>
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
                    </ul>
                </div>
            </div>
        </>
    )
}