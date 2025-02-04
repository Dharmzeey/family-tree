'use client';

import HandleRelativeSearch from "@/components/home/RelativeSearch";
import SearchRelativeCard from "@/components/home/SearchRelativeCard";
import Sidebar from "@/components/home/Sidebar";
import { searchRelativeApi } from "@/lib/api/profile";
import { ProfileData } from "@/types/profile";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function SearchRelatives() {
    const searchParams = useSearchParams();
    const queryParams = searchParams.get("query");
    const [searchResult, setSearchResult] = useState<ProfileData[]>()
    const [nextUrl, setNextUrl] = useState<string | null>(null)
    const [prevUrl, setPrevUrl] = useState<string | null>(null)

    useEffect(() => {
        setSearchResult([])
        async function searchRelatives() {
            const results = await searchRelativeApi(queryParams!);
            if (results.status === 200) {
                setSearchResult(results.data)
                setNextUrl(results.next)
                setPrevUrl(results.previous)
            }
        }

        if (queryParams) {
            searchRelatives()
        }
    }, [queryParams])

    return (
        <>
            <div className="h-full grid grid-cols-[1fr_4fr] ">
                <Sidebar />
                <div className={`${searchResult && searchResult.length > 1 ? "justify-normal" : "justify-center"} leading-10 relative flex items-center flex-col`}>
                <h2 className="text-2xl py-3">Search Relatives</h2>
                    <HandleRelativeSearch />
                    <div className="flex flex-wrap gap-4 px-8 mt-5">
                        {
                            searchResult ? searchResult!.map((result) => (
                                <SearchRelativeCard key={result.id} result={result} />
                            ))
                                :
                                <h1>No result</h1>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}