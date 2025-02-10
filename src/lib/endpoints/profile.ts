import { BASE_URL } from "../constants";


export const FETCH_RELATIONS = `${BASE_URL}/profiles/relations/`;
export const CREATE_PROFILE = `${BASE_URL}/profiles/create/`;
export const VIEW_PROFILE = `${BASE_URL}/profiles/view/`;
export const VIEW_RELATIVES = `${BASE_URL}/profiles/relatives/`;
export const SEARCH_RELATIVES = (query: string, page?: string)=> `${BASE_URL}/profiles/relatives/search/?query=${query}${page ? `&page=${page}` : ''}`;
export const ADD_ONLINE_RELATIVES = `${BASE_URL}/profiles/relation/create/`;
export const GET_NOTIFICATIONS = `${BASE_URL}/profiles/bond-notifications/`;
export const ADD_OFFLINE_RELATIVE = `${BASE_URL}/profiles/offline-relatives/`;