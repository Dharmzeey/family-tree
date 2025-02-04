import Image from "next/image";
import { RelativesData } from "@/types/relatives";

type RelativeProps = {
    relative: RelativesData;
    style?: React.CSSProperties;
    parent?: boolean;
};

function RelativeCard({ relative, style, parent }: RelativeProps) {
    return (
        <div className="flex items-center gap-2.5 bg-slate-500 rounded-lg p-2.5 shadow-sm w-[17%] z-50" style={style}>
            <div id={`relative-dot-${relative.id}`} className={`w-2 h-2 absolute bg-[#54585f] rounded-lg ${parent ? "-right-1" : "-left-1 "}`}></div>
            <div className="flex items-center gap-2">
                <Image src={relative.picture} alt={`${relative.first_name} ${relative.last_name}`} width={150} height={150} className="rounded-full w-14 h-14" />
                <div className="">
                    <div className="text-center  text-black font-bold text-lg">{relative.relation}</div>
                    <div className="font-bold">{relative.last_name}</div>
                    <div className="text-xs">{relative.first_name}</div>
                    <div className="text-xs">{relative.other_name}</div>
                </div>
            </div>
        </div>
    );
}

export default RelativeCard;