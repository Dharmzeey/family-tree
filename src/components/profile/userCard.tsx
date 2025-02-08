import { ProfileData } from "@/types/profile";
import Image from "next/image";

type prop = {
    user: ProfileData
}

export default function UserCard({ user }: prop) {
    return (
        <>
            <div className="flex items-center gap-2.5 bg-white/30 rounded-lg p-2.5 shadow-sm z-10">
                <div id="user-dot-left" className="w-2 h-2 absolute bg-[#091325] rounded-lg -left-1"></div>
                <div id="user-dot-right" className="w-2 h-2 absolute bg-[#091325] rounded-lg -right-1"></div>
                <div className="leading-6 relative flex justify-center items-center flex-col">
                    <Image
                        src={user.picture}
                        alt={user.first_name}
                        width={150}
                        height={150}
                        className="rounded-full w-16 h-16"
                    />
                    <div>{user.lineage_name}</div>
                    <div>{user.first_name}</div>
                    <div>{user.last_name}</div>
                    <div>{user.other_name}</div>
                </div>
            </div>
        </>
    )
}