import { BASE_URL } from "../constants";

export const CREATE_FAMILY = `${BASE_URL}/families/create/`;

export const VIEW_FAMILY = (familyId: string) => `${BASE_URL}/families/${familyId}/`;

export const UPDATE_FAMILY = (familyId: string) => `${BASE_URL}/families/${familyId}/update/`;

export const ADD_HANDLER = `${BASE_URL}/families/handler/add/`;
export const DELETE_HANDLER = (operatorId: string) => `${BASE_URL}/families/handler/${operatorId}/delete/`;
export const ADD_ORIGIN = (familyId: string) => `${BASE_URL}/families/${familyId}/origin/add/`;
export const UPDATE_ORIGIN = (familyId: string) => `${BASE_URL}/families/${familyId}/origin/update/`;

export const ADD_HOUSE_INFO = (familyId: string) => `${BASE_URL}/families/${familyId}/house-info/add/`;
export const UPDATE_HOUSE_INFO = (familyId: string) => `${BASE_URL}/families/${familyId}/house-info/update/`;

export const ADD_BELIEF_SYSTEM = (familyId: string) => `${BASE_URL}/families/${familyId}/belief-system/add/`;
export const UPDATE_BELIEF_SYSTEM = (familyId: string) => `${BASE_URL}/families/${familyId}/belief-system/update/`;

export const ADD_OTHER_INFO = (familyId: string) => `${BASE_URL}/families/${familyId}/other-info/add/`;
export const UPDATE_OTHER_INFO = (familyId: string) => `${BASE_URL}/families/${familyId}/other-info/update/`;

export const ADD_EULOGY = (familyId: string) => `${BASE_URL}/families/${familyId}/eulogy/add/`;
export const UPDATE_EULOGY = (familyId: string) => `${BASE_URL}/families/${familyId}/eulogy/update/`;

export const ADD_FAMILY_HEAD = (familyId: string) => `${BASE_URL}/families/${familyId}/family-head/add/`;
export const UPDATE_FAMILY_HEAD = (familyId: string) => `${BASE_URL}/families/${familyId}/family-head/update/`;
export const DELETE_FAMILY_HEAD = (familyId: string, familyHeadId: string) => `${BASE_URL}/families/${familyId}/family-head/${familyHeadId}/delete/`;
