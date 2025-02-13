'use client';
import RelativeCard from "@/components/home/RelativeCard";
import UserCard from "@/components/profile/userCard";
import { viewRelativesApi } from "@/lib/api/profile";
// import useUserStore from "@/stores/userStore";
import { ProfileData } from "@/types/profile";
import { RelativesData } from "@/types/relatives";
import { redirect } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function Relatives() {
    // const { user, initialize } = useUserStore();
    const [user, setUser] = useState<ProfileData>()
    const [error, setError] = useState<string | null | undefined>()
    const [relatives, setRelatives] = useState<RelativesData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const userCardRef = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     initialize();
    // }, [initialize]);

    useEffect(() => {
        async function getRelatives() {
            const fetchRelatives = await viewRelativesApi();
            if (fetchRelatives.status === 401) {
                redirect('/login');
            } else if (fetchRelatives.status === 404 && fetchRelatives.error === "User profile does not exist. Please create a profile first.") {
                redirect('/profile/create');
            } else if (fetchRelatives.status === 200) {
                const allRelatives = fetchRelatives.data.relatives.concat(fetchRelatives.data.offline_relatives);
                setUser(fetchRelatives.data.user)
                setRelatives(allRelatives);
            } else {
                setError(fetchRelatives.error)
            }
            setLoading(false);
        }
        getRelatives();
    }, []);

    const drawLines = () => {
        if (userCardRef.current && relatives.length > 0) {
            // Remove existing SVG elements
            const existingSvgs = userCardRef.current.querySelectorAll('svg');
            existingSvgs.forEach(svg => svg.remove());

            const userDotLeft = document.getElementById('user-dot-left');
            const userDotRight = document.getElementById('user-dot-right');

            if (userDotLeft && userDotRight) {
                relatives.forEach(relative => {
                    const relativeDot = document.getElementById(`relative-dot-${relative.id}`);
                    if (relativeDot) {
                        const userDot = relative.relation === 'Father' || relative.relation === 'Mother' ? userDotLeft : userDotRight;
                        const userRect = userDot.getBoundingClientRect();
                        const relativeRect = relativeDot.getBoundingClientRect();

                        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                        line.setAttribute("x1", `${userRect.x + userRect.width / 2}`);
                        line.setAttribute("y1", `${userRect.y + userRect.height / 2}`);
                        line.setAttribute("x2", `${relativeRect.x + relativeRect.width / 2}`);
                        line.setAttribute("y2", `${relativeRect.y + relativeRect.height / 2}`);
                        line.setAttribute("stroke", "#091325");
                        line.setAttribute("stroke-width", "2");

                        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                        svg.setAttribute("width", "100%");
                        svg.setAttribute("height", "100%");
                        const userCardRect = userCardRef.current?.getBoundingClientRect();
                        const offsetLeft = userCardRect ? userCardRect.left : 0;
                        svg.setAttribute("style", `position: absolute; top: 1; left: ${-offsetLeft}px; pointer-events: none;`);
                        svg.appendChild(line);

                        userCardRef.current!.appendChild(svg);
                    }
                });
            }
        }
    };

    useEffect(() => {
        drawLines();
    }, [relatives]);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                drawLines();
            }, 100);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeoutId);
        };
    }, [relatives]);

    return (
        <>
            <div className="relative min-w-[1300px] flex justify-center items-center content-center flex-wrap gap-3 " ref={userCardRef}>
                {
                    loading ? (
                        <h1>Loading...</h1>
                    ) :
                        !user ?
                            <b>{error}</b>
                            :
                            (
                                <>
                                    {
                                        relatives && <div className="absolute left-[30%]">
                                            <UserCard user={user} />
                                        </div>
                                    }
                                    {relatives.filter(relative => relative.relation === 'Father').map((relative) => (
                                        <RelativeCard key={relative.id} relative={relative} style={{ position: 'absolute', left: '5%', top: '20%' }} parent={true} />
                                    ))}
                                    {relatives.filter(relative => relative.relation === 'Mother').map((relative) => (
                                        <RelativeCard key={relative.id} relative={relative} style={{ position: 'absolute', left: '5%', top: '70%' }} parent={true} />
                                    ))}
                                    {relatives.filter(relative => relative.relation !== 'Father' && relative.relation !== 'Mother').map((relative, index) => {
                                        const columnIndex = Math.floor(index / 5);
                                        const rowIndex = index % 5;
                                        const leftPosition = columnIndex === 0 ? '50%' : (columnIndex === 1 ? '75%' : '100%');
                                        const topPosition = `${15 + rowIndex * 17}%`;

                                        return (
                                            <RelativeCard key={relative.id} relative={relative} style={{ position: 'absolute', left: leftPosition, top: topPosition }} />
                                        );
                                    })}
                                    {relatives.length < 1 && (
                                        <h1>You have no associated relatives, but you can add or search for relatives</h1>
                                    )}
                                </>
                            )
                }
            </div>
        </>
    );
}