'use client';
import AddFamilyBeliefSystem from "@/components/family/AddBeliefSystem";
import AddEulogy from "@/components/family/AddEulogy";
import AddFamilyHead from "@/components/family/AddFamilyHead";
import AddFamilyOrigin from "@/components/family/AddFamilyOrigin";
import AddHandler from "@/components/family/AddHandler";
import AddHouseInformation from "@/components/family/AddHouseInfo";
import AddOtherInformation from "@/components/family/AddOtherInfo";
import FamilyInfo from "@/components/family/FamilyInfo";
import { deleteHandlerApi, viewFamilyApi } from "@/lib/api/family";
import { FamilyData } from "@/types/family";
import { fetchRolesCookies } from "@/utils/cookies";
import { useEffect, useState } from "react";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";

export default function FamilyPage() {
    const [roles, setRoles] = useState<{ is_author: boolean, is_handler: boolean }>({ is_author: false, is_handler: false });
    const [family, setFamily] = useState<FamilyData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null | undefined>()

    const [showModal, setShowModal] = useState<boolean>(false);

    const [familyHeadModal, setFamilyHeadModal] = useState<boolean>(false);
    const [familyOriginModal, setFamilyOriginModal] = useState<boolean>(false);
    const [familyHouseInfoModal, setFamilyHouseInfoModal] = useState<boolean>(false);
    const [familyBeliefSystemModal, setFamilyBeliefSystemModal] = useState<boolean>(false);
    const [familyEulogyModal, setFamilyEulogyModal] = useState<boolean>(false);
    const [familyOtherInfoModal, setFamilyOtherInfoModal] = useState<boolean>(false);
    const [familyHandlersModal, setFamilyHandlersModal] = useState<boolean>(false);

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


    const toggleModal = (modalSetter: React.Dispatch<React.SetStateAction<boolean>>) => {
        setShowModal(!showModal);
        modalSetter(prev => !prev);
    }

    const deleteHandler = async (operatorId: string, operator: string) => {
        if (confirm(`Are you sure you want to remove ${operator} from the list of people who Manage this family's profile ?`)) {
            await deleteHandlerApi(operatorId);
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
                        (roles.is_author || roles.is_handler) && <button onClick={() => toggleModal(setFamilyHeadModal)}><FaPlus /></button>
                    }
                    {
                        (showModal && familyHeadModal) && <div className="absolute w-full top-[15%]">
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

            <FamilyInfo heading="Origin"
                details={family.family_origin ? family.family_origin.details : "No origin details available."}
                roles={roles}
                isAdded={family.family_origin ? true : false}
                onClickFn={() => { toggleModal(setFamilyOriginModal) }} />
            {
                (showModal && familyOriginModal) && <div className="absolute w-full top-[30%]">
                    <AddFamilyOrigin />
                </div>
            }

            <FamilyInfo heading="House Information"
                details={family.family_house_info ? family.family_house_info.details : "No house information available."}
                roles={roles}
                isAdded={family.family_house_info ? true : false}
                onClickFn={() => { toggleModal(setFamilyHouseInfoModal) }} />
            {
                (showModal && familyHouseInfoModal) && <div className="absolute w-full ">
                    <AddHouseInformation />
                </div>
            }

            <FamilyInfo heading="Belief System"
                details={family.family_belief_system ? family.family_belief_system.details : "No belief system details available."}
                roles={roles}
                isAdded={family.family_belief_system ? true : false}
                onClickFn={() => { toggleModal(setFamilyBeliefSystemModal) }} />
            {
                (showModal && familyBeliefSystemModal) && <div className="absolute w-full top-[10%]">
                    <AddFamilyBeliefSystem />
                </div>
            }

            <FamilyInfo heading="Eulogy"
                details={family.family_eulogy ? family.family_eulogy.details : "No eulogy details available."}
                roles={roles}
                isAdded={family.family_eulogy ? true : false}
                onClickFn={() => { toggleModal(setFamilyEulogyModal) }}
                isPreserved={true} />
            {
                (showModal && familyEulogyModal) && <div className="absolute w-full top-[15%]">
                    <AddEulogy />
                </div>
            }

            <FamilyInfo heading="Other Information"
                details={family.family_other_information ? family.family_other_information.details : "No other information available."}
                roles={roles}
                isAdded={family.family_other_information ? true : false}
                onClickFn={() => { toggleModal(setFamilyOtherInfoModal) }} />
            {
                (showModal && familyOtherInfoModal) && <div className="absolute w-full top-[40%]">
                    <AddOtherInformation />
                </div>
            }

            <div className="mt-4">
                <div className="flex gap-2">
                    <h2 className="text-xl font-semibold">Family Handlers in charge of these information</h2>
                    {
                        (roles.is_author || roles.is_handler) && <button onClick={() => toggleModal(setFamilyHandlersModal)}><FaPlus /></button>
                    }
                </div>
                {family.family_handlers && family.family_handlers.length > 0 ? (
                    <ul className="list-disc pl-5">
                        {family.family_handlers.map((handler) => (
                            <li key={handler.id}>
                                <div className="flex gap-2 items-center">
                                    {handler.operator} {roles.is_author &&
                                        <button onClick={() => { deleteHandler(handler.operator_id, handler.operator) }}>
                                            <FaTrash size={12} color="red" />
                                        </button>}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No family handlers available.</p>
                )}
            </div>
            {
                (showModal && familyHandlersModal) && <div className="absolute w-full top-[50%]">
                    <AddHandler />
                </div>
            }
        </div>
    );
}
