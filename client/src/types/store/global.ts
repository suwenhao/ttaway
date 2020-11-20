
export interface ILocation {
    lat?: number;
    lng?: number;
    city?: string;
    district?: string;
    province?: string;
    id?: string,
    address?: string;
    name?: string;
}
export interface IGlobalState {
    location: ILocation;
}

export interface IGlobalModel {
    namespaced: boolean;
    state: IGlobalState;
    getters: {

    },
    actions: {},
    mutations: {
        changeLocationLatLng: (state: IGlobalState, newState: ILocation) => void;
    }
}