import Image from "next/image";
import { ProfileData } from "@/types/profile";

type Relative = {
    result: ProfileData
}

export default function SearchRelativeCard(prop: Relative) {
    return (
        <>
            <div className="leading-7">
                <Image src={prop.result.picture} alt={prop.result.first_name} width={100} height={100} className="rounded-full w-28 h-28" />
                <div>Lineage Name: {prop.result.lineage_name}</div>
                <div>Last Name: {prop.result.last_name}</div>
                <div>First Name: {prop.result.first_name}</div>
                <div>Other Name: {prop.result.other_name}</div>
            </div>
        </>
    )
}