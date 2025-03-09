export type FamilyData = {
    id: string;
    family_heads?: {
        id: string;
        person: string;
        still_on_throne: boolean;
        comment: string;
        date_from: string;
        date_to: string | null;
    }[];
    family_handlers?: {
        id: string;
        operator_id: string;
        operator: string;
    }[];
    family_origin?: {
        id: string;
        details: string;
    };
    family_house_info?: {
        id: string;
        details: string;
    };
    family_belief_system?: {
        id: string;
        details: string;
    };
    family_eulogy?: {
        id: string;
        details: string;
    };
    family_other_information?: {
        id: string;
        details: string;
    };
    name: string;
    author: string;
};

type FamilyHeadData = {
    familyHead_id: string;
    comment: string;
    date_from: string;
    date_to?: string | undefined;   
}


export type { FamilyHeadData }