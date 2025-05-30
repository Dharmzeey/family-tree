'use client'

import { useEffect, useState } from "react"
import { ActionButton } from "@/components/ui/button"
import { getNotificationsApi, processNotificationApi } from "@/lib/api/profile"
import { NotificationData } from "@/types/profile"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Loader } from "@/components/ui/loader"

export default function NotificationPage() {
    const [notifications, setNotifications] = useState<NotificationData[]>([])
    const [error, setError] = useState<string | null | undefined>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const router = useRouter()

    useEffect(() => {
        const fetchNotifications = async () => {
            const response = await getNotificationsApi()
            if (response.status === 200) {
                setNotifications(response.data as NotificationData[])
            } else {
                setError(response.error)
            }
            setLoading(false);
        }

        fetchNotifications()
    }, [router])

    const acceptRequest = async (id: string) => {
        const response = await processNotificationApi({ bond_request_id: id, accept: true })
        if (response.status === 200) {
            setNotifications(prevData => prevData?.filter(item => item.id != id)); // Remove the item from the state
        } else {
            alert(`${response.error} You will have to reject`)
        }
    }

    const rejectRequest = async (id: string) => {
        const response = await processNotificationApi({ bond_request_id: id, accept: false })
        if (response.status === 200) {
            setNotifications(prevData => prevData?.filter(item => item.id != id)); // Remove the item from the state
        }
    }

    if (loading) return <Loader />

    return (
        <>
            {error ? (
                <h1 className="mt-10 flex justify-center items-center">{error}</h1>
            ) : (
                <div className="mt-10">
                    <h1 className="text-center font-bold text-lg px-3">Bond Notification requests</h1>
                    {notifications.map((notification: NotificationData) => (
                        <div key={notification.id}>
                            <div className="p-4 pr-7 border-b border-gray-200 flex flex-col md:flex-row justify-between gap-3">
                                <div>
                                    <Image src={notification.picture} alt={`${notification.full_name}`} width={150} height={150} className="rounded-full w-14 h-14" />
                                    <h2 className="text-lg font-semibold">{notification.sender}</h2>
                                    <p className="text-gray-100"> <b>{notification.full_name}</b> says you are <b>{notification.relation} </b> to them and wants to connect.</p>
                                    <p className="text-white">Lineage: {notification.lineage_name}</p>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <ActionButton buttonText="Accept" onClick={() => acceptRequest(notification.id)} />
                                    <ActionButton buttonText="Reject" onClick={() => rejectRequest(notification.id)} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}