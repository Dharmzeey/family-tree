"use client";

import { useRouter } from "next/navigation";

const reload1000ms = () => {
    setTimeout(() => {
        location.reload() // reload after 1s
    }, 1500)
}

function goHome1500ms(router: ReturnType<typeof useRouter>) {
    setTimeout(() => {
        router.push("/");
    }, 1500); // Redirect after 1.5 seconds
}
export { reload1000ms, goHome1500ms }