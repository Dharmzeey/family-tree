type ProfileData = {
    id: string;
    lineage_name: string;
    last_name: string;
    first_name: string;
    other_name: string;
    picture: string;
};

type NotificationData = {
    id: string;
    lineage_name: string;
    sender: string;
    relation: string;
};

export type { ProfileData, NotificationData }