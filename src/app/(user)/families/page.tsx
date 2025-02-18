'use client';
import FamilyInfo from "@/components/family/FamilyInfo";
import { viewFamilyApi } from "@/lib/api/family";
import { FamilyData } from "@/types/family";
import { fetchRolesCookies } from "@/utils/cookies";
import { useEffect, useState } from "react";
import { FaPen, FaPlus } from "react-icons/fa";

export default function FamilyPage() {
    const [roles, setRoles] = useState<{ is_author: boolean, is_handler: boolean }>({ is_author: false, is_handler: false });
    const [family, setFamily] = useState<FamilyData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null | undefined>()

    useEffect(() => {
        async function fetchRoles() {
            const roles = await fetchRolesCookies();
            console.log(roles.is_author)
            console.log(roles.is_handler)
            setRoles(roles);
        }
        fetchRoles();
    }, []);

    useEffect(() => {
        const fetchFamily = async () => {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const familyId = user.family_id;
            if (!familyId) {
                setError('Family ID not found in local storage');
                setLoading(false);
                return;
            }
            const response = await viewFamilyApi(familyId);
            if (response.status === 200) {
                setFamily(response.data)
            } else {
                setError(response.error);
            }
            setLoading(false);
        };
        fetchFamily();
    }, []);

    if (loading) return <p className="flex justify-center items-center">Loading family details...</p>;
    if (error) return <p className="flex justify-center items-center">{error}</p>;
    if (!family) return <p className="flex justify-center items-center">No family data available.</p>;

    return (
        <div className="p-6 w-[90%] mx-auto shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4 text-center">The family of {family.name}</h1>
            <p className="font-bold text-xl text-gray-200">Author: {family.author}</p>

            <div className="mt-4">
                <div className="flex gap-2">
                    <h2 className="text-xl font-semibold">Family Heads</h2>
                    {
                        (roles.is_author || roles.is_handler) && <FaPlus />

                    }
                </div>
                {family.family_heads && family.family_heads.length > 0 ? (
                    <ul className="list-disc pl-5">
                        {family.family_heads.map((head) => (
                            <li key={head.id} className="mt-2 mb-3">
                                <div className="flex gap-3">
                                    <b>{head.person} ({head.still_on_throne ? "Still on throne" : "Former"})</b>
                                    {
                                        (roles.is_author || roles.is_handler) && <FaPen />
                                    }
                                </div>
                                <span className="text-gray-300 text-sm ">From: {head.date_from} {head.date_to ? ` till ${head.date_to}` : " till present"}</span>
                                <p className="text-gray-300 text-justify">{head.comment}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No family heads available.</p>
                )}
            </div>
            <FamilyInfo heading="Origin" details={family.family_origin ? family.family_origin.details : "No origin details available."} roles={roles} />

            <FamilyInfo heading="House Information" details={family.family_house_info ? family.family_house_info.details : "No house information available."} roles={roles} />

            <FamilyInfo heading="Belief System" details={family.family_belief_system ? family.family_belief_system.details : "No belief system details available."} roles={roles} />

            <FamilyInfo heading="Eulogy" details={family.family_eulogy ? family.family_eulogy.details : "No eulogy details available."} roles={roles} />

            <FamilyInfo heading="Other Information" details={family.family_other_information ? family.family_other_information.details : "No other information available."} roles={roles} />

            <div className="mt-4">
                <div className="flex gap-2">
                    <h2 className="text-xl font-semibold">Family Handlers in charge of these information</h2>
                    {
                        (roles.is_author || roles.is_handler) && <FaPlus />
                    }
                </div>
                {family.family_handlers && family.family_handlers.length > 0 ? (
                    <ul className="list-disc pl-5">
                        {family.family_handlers.map((handler) => (
                            <li key={handler.id}>
                                <div className="flex gap-3">
                                    {handler.operator} {roles.is_author && <FaPen />}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No family handlers available.</p>
                )}
            </div>

        </div>
    );
}
