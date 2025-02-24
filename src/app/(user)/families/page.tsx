'use client';
import AddFamilyBeliefSystem from "@/components/family/AddBeliefSystem";
import AddEulogy from "@/components/family/AddEulogy";
import AddFamilyHead from "@/components/family/AddFamilyHead";
import AddFamilyOrigin from "@/components/family/AddFamilyOrigin";
import AddHandler from "@/components/family/AddHandler";
import AddHouseInformation from "@/components/family/AddHouseInfo";
import AddOtherInformation from "@/components/family/AddOtherInfo";
import UpdateFamilyBeliefSystem from "@/components/family/UpdateBeliefSystem";
import UpdateHouseInformation from "@/components/family/UpdateHouseInfo";
import FamilyInfo from "@/components/family/FamilyInfo";
import { deleteFamilyHeadApi, deleteHandlerApi, viewFamilyApi } from "@/lib/api/family";
import { FamilyData } from "@/types/family";
import { fetchRolesCookies } from "@/utils/cookies";
import { useEffect, useState } from "react";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import UpdateFamilyOrigin from "@/components/family/UpdateFamilyOrigin";
import UpdateEulogy from "@/components/family/UpdateEulogy";
import UpdateOtherInformation from "@/components/family/UpdateOtherInfo";
import UpdateFamilyHead from "@/components/family/UpdateFamilyHead";

export default function FamilyPage() {
    const [roles, setRoles] = useState<{ is_author: boolean, is_handler: boolean }>({ is_author: false, is_handler: false });
    const [family, setFamily] = useState<FamilyData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null | undefined>()

    const [activePopupId, setActivePopupId] = useState<string | null>(null)

    useEffect(() => {
        async function fetchRoles() {
            const roles = await fetchRolesCookies();
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


    const handleShowPopup = (id: string) => {
        setActivePopupId(activePopupId === id ? null : id)
    }

    const deleteHandler = async (operatorId: string, operator: string) => {
        if (confirm(`Are you sure you want to remove ${operator} from the list of people who Manage this family's profile ?`)) {
            await deleteHandlerApi(operatorId);
            location.reload()
        }
    }
    const deleteFamilyHead = async (familyId: string, familyHead: string, familyHeadId: string) => {
        if (confirm(`Are you sure you want to delete ${familyHead} from the list of the family's Head ?`)) {
            await deleteFamilyHeadApi(familyId, familyHeadId);
            location.reload()
        }
    }


    if (loading) return <p className="flex justify-center items-center">Loading family details...</p>;
    if (error) return <p className="flex justify-center items-center">{error}</p>;
    if (!family) return <p className="flex justify-center items-center">No family data available.</p>;

    return (
        <div className="p-6 w-[90%] mx-auto shadow-lg rounded-lg  z-30">
            <h1 className="text-2xl font-bold mb-4 text-center">The family of {family.name}</h1>
            <p className="font-bold text-xl text-gray-200">Author: {family.author}</p>

            <div className="mt-4">
                <div className="flex gap-2">
                    <h2 className="text-xl font-semibold">Family Heads</h2>
                    {
                        (roles.is_author || roles.is_handler) && <button onClick={() => handleShowPopup('add-family')}><FaPlus /></button>
                    }
                    {
                        (activePopupId === 'add-family') && <div className="absolute w-full top-[25%]">
                            <AddFamilyHead />
                        </div>
                    }
                </div>
                {family.family_heads && family.family_heads.length > 0 ? (
                    <ul className="list-disc pl-5">
                        {family.family_heads.map((head) => (
                            <li key={head.id} className="mt-2 mb-3">
                                <div className="flex gap-3">
                                    <b>{head.person} ({head.still_on_throne ? "Still on throne" : "Former"})</b>
                                    {
                                        (roles.is_author || roles.is_handler) &&
                                        <div className="flex gap-4">
                                            <button onClick={() => handleShowPopup(head.id)}>
                                                <FaPen />
                                            </button>
                                            <button onClick={() => deleteFamilyHead(family.id, head.person, head.id)}>
                                                <FaTrash color="red" />
                                            </button>
                                        </div>
                                    }
                                    {
                                        (activePopupId === head.id) && <div className="absolute w-full top-[30%]">
                                            <UpdateFamilyHead familyHead={head} />
                                        </div>
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

            <FamilyInfo heading="Origin"
                details={family.family_origin ? family.family_origin.details : "No origin details available."}
                roles={roles}
                isAdded={family.family_origin ? true : false}
                onClickFn={() => { handleShowPopup('add-origin') }} />
            {
                (activePopupId === 'add-origin') && <div className="absolute w-full top-[30%]">
                    {family.family_origin ? <UpdateFamilyOrigin origin={family.family_origin.details} /> : <AddFamilyOrigin />}
                </div>
            }

            <FamilyInfo heading="House Information"
                details={family.family_house_info ? family.family_house_info.details : "No house information available."}
                roles={roles}
                isAdded={family.family_house_info ? true : false}
                onClickFn={() => { handleShowPopup('add-house-info') }} />
            {
                (activePopupId === 'add-house-info') && <div className="absolute w-full top-[30%]">
                    {family.family_house_info ? <UpdateHouseInformation houseInformation={family.family_house_info.details} /> : <AddHouseInformation />}
                </div>
            }

            <FamilyInfo heading="Belief System"
                details={family.family_belief_system ? family.family_belief_system.details : "No belief system details available."}
                roles={roles}
                isAdded={family.family_belief_system ? true : false}
                onClickFn={() => { handleShowPopup('add-belief-system') }} />
            {
                (activePopupId === 'add-belief-system') && <div className="absolute w-full top-[10%]">
                    {family.family_belief_system ? <UpdateFamilyBeliefSystem beliefSystem={family.family_belief_system.details} /> : <AddFamilyBeliefSystem />}
                </div>
            }

            <FamilyInfo heading="Eulogy"
                details={family.family_eulogy ? family.family_eulogy.details : "No eulogy details available."}
                roles={roles}
                isAdded={family.family_eulogy ? true : false}
                onClickFn={() => { handleShowPopup('add-eulogy') }}
                isPreserved={true} />
            {
                (activePopupId === 'add-eulogy') && <div className="absolute w-full top-[15%]">
                    {family.family_eulogy ? <UpdateEulogy eulogy={family.family_eulogy.details} /> : <AddEulogy />}
                </div>
            }

            <FamilyInfo heading="Other Information"
                details={family.family_other_information ? family.family_other_information.details : "No other information available."}
                roles={roles}
                isAdded={family.family_other_information ? true : false}
                onClickFn={() => { handleShowPopup('add-other-info') }} />
            {
                (activePopupId === 'add-other-info') && <div className="absolute w-full top-[40%]">
                    {family.family_other_information ? <UpdateOtherInformation otherInformation={family.family_other_information.details} /> : <AddOtherInformation />}
                </div>
            }

            <div className="mt-4">
                <div className="flex gap-2">
                    <h2 className="text-xl font-semibold">Family Handlers in charge of these information</h2>
                    {
                        (roles.is_author || roles.is_handler) && <button onClick={() => handleShowPopup('add-handler')}><FaPlus /></button>
                    }
                    {
                        (activePopupId === 'add-handler') && <div className="absolute w-full top-[50%]">
                            <AddHandler />
                        </div>
                    }
                </div>
                {family.family_handlers && family.family_handlers.length > 0 ? (
                    <ul className="list-disc pl-5">
                        {family.family_handlers.map((handler) => (
                            <li key={handler.id}>
                                {handler.operator} {roles.is_author &&
                                    <button onClick={() => { deleteHandler(handler.operator_id, handler.operator) }}>
                                        <FaTrash size={12} color="red" />
                                    </button>}
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