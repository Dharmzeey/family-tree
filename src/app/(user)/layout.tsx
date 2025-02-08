import Sidebar from "@/components/home/Sidebar";
import HamburgerMenu from "@/components/layout/Hamburger";


export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <HamburgerMenu />
            <div className="h-full overflow-scroll grid md:grid-cols-[1fr_4fr] ">
                <div className="border-r border-gray-400 hidden md:block ">
                    <Sidebar />
                </div>
                {children}
            </div>
        </>
    );
}