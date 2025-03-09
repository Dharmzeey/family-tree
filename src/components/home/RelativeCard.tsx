"use client";

import Image from "next/image";
import { RelativesData } from "@/types/relatives";
import { ActionButton } from "../ui/button";
import { useRouter } from "next/navigation";
import { deleteRelativeApi } from "@/lib/api/profile";

type RelativeProps = {
    relative: RelativesData;
    style?: React.CSSProperties;
    parent?: boolean;
    isLoggedInOwner?: boolean; // This will put a delete icon for when the Logged in user is viewing their own relatives, but will be absent when the are viewing others
};

function RelativeCard({ relative, style, parent, isLoggedInOwner }: RelativeProps) {
    const router = useRouter();
    const handleRelativeClick = (id: string) => {
        router.push(`/relatives/${id}`)
    }

    const deleteRelative = async (id: string) => {
        if (confirm("Are you sure you want to delete this relative?")) {
            const response = await deleteRelativeApi(id)
            if (response.status === 200) {
                // router.refresh()
                window.location.reload()
            } else {
                alert(response.error)
            }
        }
    }

    return (
        <div className="flex items-center gap-2.5 bg-slate-500 rounded-lg p-2.5 pr-0 shadow-sm w-[17%] z-20" style={style}>
            <div id={`relative-dot-${relative.id}`} className={`w-2 h-2 absolute bg-[#54585f] rounded-lg ${parent ? "-right-1" : "-left-1 "}`}></div>
            <div className="flex items-center gap-2 w-full">
                <Image src={relative.picture} alt={`${relative.first_name} ${relative.last_name}`} width={150} height={150} className="rounded-full w-14 h-14" />
                <div className="w-full">
                    <div className="flex justify-between w-full">
                        <div className="text-center text-black font-bold text-lg">{relative.relation}</div>
                        {
                            isLoggedInOwner && <button className="text-[red] font-bold" onClick={() => { deleteRelative(relative.id) }}>
                                {/* <FaTrash size={14} /> */}
                                X
                            </button>
                        }
                    </div>
                    <div className="font-bold">{relative.last_name}</div>
                    <div className="text-xs">{relative.first_name}</div>
                    <div className="text-xs">{relative.other_name}</div>
                    {
                        relative.has_relatives && <div className="text-xs"><ActionButton buttonText="View Relative" onClick={() => { handleRelativeClick(relative.id) }} /></div>
                    }

                </div>
            </div>
            <div>

            </div>
        </div>
    );
}

export default RelativeCard;