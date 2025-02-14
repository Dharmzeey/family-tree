type RelationData = {
    id: string;
    name: string;
}


type RelativesData = {
    id: string;
    first_name: string;
    last_name: string;
    other_name: string;
    relation: string;
    picture: string;
    has_relatives?: boolean;
};


export type { RelationData, RelativesData}