import {create} from 'zustand';
import {TwitterTagData} from "../utils/helpers";
import { persist, PersistStorage} from "zustand/middleware";


// Create the Storage for Chrome Extension


let data: TwitterTagData[] = [];

export interface TwitterTagState {
    actions: { setTag: (tag: TwitterTagData) => void; };
    data: TwitterTagData[];
}

const chromeLocalStorage: PersistStorage<TwitterTagState> = {
    getItem: async (name) => {
        const result = await chrome.storage.local.get(name);
        if (result[name]) {
            return result[name];
        }
        return null;
    },
    setItem: async (name, value) => {
        await chrome.storage.local.set({
            [name]: value
        });
    },
    removeItem: async (name) => await chrome.storage.local.remove(name),
}
const tagStore = (set) => ({
    data: [],
    addTag: (tag: TwitterTagData) => {
        set((state: TwitterTagState) => ({
            data: [...state.data.filter(record => record.profile !== tag.profile), tag]
        }));
    }
});
export const useTags = create(
    persist(
        tagStore,
        {
            name: 'twitter-tags',
            storage: chromeLocalStorage,
            skipHydration: false,
        }
    ));
