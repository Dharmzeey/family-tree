'use client'

import { FaBars } from "react-icons/fa";
import Sidebar from "../home/Sidebar";
import { useState } from "react";

export default function HamburgerMenu() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    return (
        <>
            <div className="md:hidden">
                <button
                    className="fixed top-4 left-4 p-d2 text-white z-50"
                    onClick={() => {
                        setIsSidebarOpen(!isSidebarOpen);
                    }}
                >
                    <FaBars size={24} />
                </button>

                <div
                    className={`fixed md:relative h-full px-2 transition-transform duration-300 ease-in-out bg-[#091325] z-30 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                        } md:translate-x-0`}
                >
                    <Sidebar />
                </div>
            </div>
        </>
    )
}