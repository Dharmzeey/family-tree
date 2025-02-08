import Link from "next/link";

export default function Sidebar() {
    return (
        <>
            <div className="h-full min-w-48 flex justify-center items-center leading-10 px-3">
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
        </>
    )
}