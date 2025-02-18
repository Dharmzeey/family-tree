import { FaPen } from "react-icons/fa";

interface FamilyInfoProps {
    heading: string;
    details: string;
    roles: { is_author: boolean, is_handler: boolean };
}

export default function FamilyInfo({ heading, details, roles }: FamilyInfoProps) {
    return (
        <>
            <div className="mt-4">
                <div className="flex gap-2">
                    <h2 className="text-xl font-semibold">{heading}</h2>
                    {
                        (roles.is_author || roles.is_handler) && <FaPen />
                    }
                </div>
                <p className="text-gray-300 text-justify">{details}</p>
            </div>
        </>
    )
}