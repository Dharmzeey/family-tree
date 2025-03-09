"use client";

import Image from "next/image";
import { GetProfileData } from "@/types/profile";
import { ActionButton } from "../ui/button";
import AddOnlineRelativePopUp from "./AddRelativePopUp";


type SearchRelativeCardProps = {
    result: GetProfileData;
    isPopupShown: boolean;
    onShowPopup: () => void;
};


export default function SearchRelativeCard({result, isPopupShown, onShowPopup}:SearchRelativeCardProps) {

    return (
        <>
            <div className="leading-7">
                <Image src={result.picture} alt={result.first_name} width={100} height={100} className="rounded-full w-24 h-24" />
                <div>Lineage Name: {result.lineage_name}</div>
                <div>Last Name: {result.last_name}</div>
                <div>First Name: {result.first_name}</div>
                <div>Other Name: {result.other_name}</div>
                <ActionButton buttonText="Bond with relative" onClick={onShowPopup} />
                <div className="relative">
                    {
                        isPopupShown && <AddOnlineRelativePopUp profile={result} />
                    }
                </div>
            </div>
        </>
    )
}
