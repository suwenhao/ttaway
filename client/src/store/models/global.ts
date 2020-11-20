import StorageModel, {LOCATION} from '@/utils/storage'
import {IGlobalState, IGlobalModel} from '@/types/store/global'

const Storage = new StorageModel();

const initialState: IGlobalState = {
    location: Storage.get(LOCATION) || {
        lat: 0,
        lng: 0,
        city: '选择城市',
        district: '',
        province: '',
        name: '正在定位...',
        address: ''
    }
};

const model: IGlobalModel = {
    namespaced: true,
    state: initialState,
    getters: { },
    actions: { },
    mutations: {
        // 保存经纬度到vuex中
        changeLocationLatLng (state, newState) {
            state.location = {
                ...state.location,
                ...newState
            }
            console.log(state.location)
            Storage.set(LOCATION, state.location);
        }
    }
}
export default model
