import { getNotificationsApi } from "@/lib/api/profile"
import { NotificationData } from "@/types/profile"
import { redirect } from "next/navigation"

export default async function NotificationPage() {
    const resonse = await getNotificationsApi()
    if (resonse.status === 401){
        redirect("/login")
    }

    return (
        <>
        {
            resonse.status === 200 ? (
                <>
                    {resonse.data.map((notification: NotificationData) => (
                        <div key={notification.id}>
                            <h2>{notification.sender}</h2>
                            <p>{notification.relation}</p>
                        </div>
                    ))}
                </>
            ) : (
                <h1 className="flex justify-center items-center">{resonse.error}</h1>
            )
        }
        </>
    )
}