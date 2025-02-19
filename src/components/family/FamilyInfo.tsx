import { FaPen, FaPlus } from "react-icons/fa";

interface FamilyInfoProps {
    heading: string;
    details: string;
    isAdded: boolean;
    isPreserved?: boolean
    onClickFn: () => void;
    roles: { is_author: boolean, is_handler: boolean };
}

export default function FamilyInfo({ heading, details, roles, isAdded, isPreserved, onClickFn }: FamilyInfoProps) {
    return (
        <>
            <div className="mt-4">
                <div className="flex gap-2">
                    <h2 className="text-xl font-semibold">{heading}</h2>
                    {
                        (roles.is_author || roles.is_handler) && <button onClick={onClickFn}>
                            {
                                isAdded ? <FaPen /> : <FaPlus />
                            }
                        </button>
                    }
                </div>
                {
                    isPreserved ?
                        <pre className="text-gray-300 text-justify">{details}</pre>
                        :
                        <p className="text-gray-300 text-justify">{details}</p>
                }
            </div>
        </>
    )
}