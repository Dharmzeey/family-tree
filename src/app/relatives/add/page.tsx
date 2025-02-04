import RelativeForm from "@/components/home/RelativeForm";
import Sidebar from "@/components/home/Sidebar";

export default function AddRelative() {
    return (
        <>
            <div className="h-full grid grid-cols-[1fr_4fr] ">
                <Sidebar />
                <div className="leading-10 relative flex justify-center items-center flex-col">
                    <RelativeForm />
                </div>
            </div>
        </>
    );
}