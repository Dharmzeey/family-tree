'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ActionButton } from "../ui/button";

export default function HandleRelativeSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }

    const handleSubmit = () => {
        if (searchTerm.trim()) {
            router.replace(`/relatives/search?query=${encodeURIComponent(searchTerm)}`)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleSubmit()
        }
    }
    return (
        <>
            <form onSubmit={(e) => e.preventDefault()} className="flex justify-center gap-3 text-black w-4/5 mx-auto">
                <input type="text"
                className="block w-[min(80%,40rem)] px-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    name="search-relatives"
                    id="search-relatives"
                    placeholder="Search Relatives"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                />
                <ActionButton buttonText="Submit" onClick={handleSubmit} />
            </form>
        </>
    )
}