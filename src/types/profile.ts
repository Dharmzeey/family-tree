interface BaseProfileData  {
    lineage_name: string;
    last_name: string;
    first_name: string;
    other_name: string;
};


interface SendProfileData extends BaseProfileData{
    picture: File;
}

interface GetProfileData extends BaseProfileData{
    id: string
    picture: string;
}

type NotificationData = {
    id: string;
    lineage_name: string;
    full_name: string
    sender: string;
    relation: string;
    picture: string;
};

type OfflineRelativesData = {
    id?: string;
    first_name: string;
    last_name: string;
    other_name: string;
    relation: string;
    picture?: File;
}

export type { SendProfileData, GetProfileData, NotificationData, OfflineRelativesData }