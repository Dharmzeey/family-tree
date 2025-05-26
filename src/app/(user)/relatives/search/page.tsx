'use client';

import HandleRelativeSearch from "@/components/home/RelativeSearch";
import SearchRelativeCard from "@/components/home/SearchRelativeCard";
import { DotsLoader } from "@/components/ui/loader";
import { searchRelativeApi } from "@/lib/api/profile";
import { GetProfileData } from "@/types/profile";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function PerformSearch() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const queryParams = searchParams.get("query");
    const pageParams = searchParams.get("page") || undefined;
    const [searchResult, setSearchResult] = useState<GetProfileData[] | null>(null);
    // These below is for pagination
    // an example is 
    // "next": "http://localhost:8000/v1/profiles/relatives/search/?page=3&queryyy=a",
    // "previous": "http://localhost:8000/v1/profiles/relatives/search/?queryyy=a"
    const [nextUrl, setNextUrl] = useState<string | null>(null);
    const [prevUrl, setPrevUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state

    // Toggle popup for each card
    const [activePopupId, setActivePopupId] = useState<string | null>(null);

    const handleShowPopup = (id: string) => {
        setActivePopupId(activePopupId === id ? null : id);
    };

    useEffect(() => {
        async function searchRelatives() {
            if (queryParams) {
                setIsLoading(true); // Start loading
                setSearchResult(null); // Reset search results

                const results = await searchRelativeApi(queryParams, pageParams); // the pageParams is optional
                if (results.status === 200) {
                    setSearchResult(results.data as unknown as GetProfileData[]);
                    if (results.pagination) {
                        setNextUrl(results.pagination.next);
                        setPrevUrl(results.pagination.previous);
                    } else {
                        // if no pagination, reset the next and previous url
                        setNextUrl(null)
                        setPrevUrl(null)
                    }
                }
                setIsLoading(false); // Stop loading
            }
        }

        searchRelatives();
    }, [queryParams, pageParams]);

    // Handle "Next" button click
    const handleNext = () => {
        /**Takes the returned nextUrl and extracts the page and query parameters from it.
            * Then, it pushes the new URL to the router.
            * This will trigger a new search with the new page and query parameters.
         */

        if (nextUrl) {
            const url = new URL(nextUrl);
            const params = new URLSearchParams(url.search);
            const page = params.get("page");
            const query = params.get("query");
            router.push(`/relatives/search?query=${encodeURIComponent(query || "")}&page=${encodeURIComponent(page || "")}`);
        }
    };

    // Handle "Previous" button click
    const handlePrevious = () => {
        if (prevUrl) {
            const url = new URL(prevUrl);
            const params = new URLSearchParams(url.search);
            const page = params.get("page");
            const query = params.get("query");
            router.push(`/relatives/search?query=${encodeURIComponent(query || "")}&page=${encodeURIComponent(page || "")}`);
        }
    };


    useEffect(() => {
        const onESCPress = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setActivePopupId(null);
            }
        };

        document.addEventListener("keydown", onESCPress);
        return () => {
            document.removeEventListener("keydown", onESCPress);
        };
    }, []);

    return (
        <>
            <div className={`${searchResult && searchResult.length > 1 ? "justify-normal" : "justify-center"} leading-10 relative flex items-center flex-col`}>
                <h2 className="text-2xl py-3">Search Relatives</h2>
                <HandleRelativeSearch />
                <div className="flex flex-wrap gap-4 px-8 mt-5">
                    {
                        isLoading ? (
                            <DotsLoader />
                        ) : searchResult && searchResult.length > 0 ? (
                            searchResult.map((result) => (
                                <SearchRelativeCard
                                    key={result.id}
                                    result={result}
                                    isPopupShown={activePopupId === result.id}
                                    onShowPopup={() => handleShowPopup(result.id)}
                                />
                            ))
                        ) : (
                            <h1>No result</h1> // Show "No result" only after loading is complete
                        )
                    }
                </div>
                {/* Pagination Buttons */}
                <div className="flex gap-4 mt-5">
                    <button
                        onClick={handlePrevious}
                        disabled={!prevUrl || isLoading}
                        className={`px-4 py-2 bg-blue-500 text-white rounded ${!prevUrl || isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
                            }`}
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={!nextUrl || isLoading}
                        className={`px-4 py-2 bg-blue-500 text-white rounded ${!nextUrl || isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
                            }`}
                    >
                        Next
                    </button>
                </div>

            </div>
        </>
    );
}

export default function SearchRelative() {
    return (
        <Suspense fallback={<DotsLoader />}>
            <PerformSearch />
        </Suspense>
    )
}