import { BASE_URL } from "../constants";

export const CREATE_FAMILY = `${BASE_URL}/families/create/`;
export const VIEW_FAMILY = (familyId: string) => `${BASE_URL}/families/${familyId}/`;
export const UPDATE_FAMILY = (familyId: string) => `${BASE_URL}/families/${familyId}/update/`;
export const ADD_HANDLER = `${BASE_URL}/families/handler/add/`;
export const ADD_ORIGIN = (familyId: string) => `${BASE_URL}/families/${familyId}/origin/add/`;
export const ADD_HOUSE_INFO = (familyId: string) => `${BASE_URL}/families/${familyId}/house-info/add/`;
export const ADD_BELIEF_SYSTEM = (familyId: string) => `${BASE_URL}/families/${familyId}/belief-system/add/`;
export const ADD_OTHER_INFO = (familyId: string) => `${BASE_URL}/families/${familyId}/other-info/add/`;
export const ADD_EULOGY = (familyId: string) => `${BASE_URL}/families/${familyId}/eulogy/add/`;
export const ADD_FAMILY_HEAD = (familyId: string) => `${BASE_URL}/families/${familyId}/family-head/add/`;

