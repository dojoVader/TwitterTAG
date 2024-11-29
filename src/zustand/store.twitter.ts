import { create } from 'zustand';
import {TwitterTagData} from "../utils/helpers";
import {TwitterLDJSON} from "../interface/TwitterLDJSON";

interface TwitterStore {
  data: TwitterLDJSON;
}


let data = null;

export interface TwitterProfileState {
  actions: { setData: (data: TwitterLDJSON) => void };
  data: TwitterLDJSON;
}

export const useTwitterLDStore = create<TwitterProfileState>((set) => ({
  data,
  actions: {
    setData: (data: TwitterLDJSON) => {
      // @ts-ignore
      set((state) => ({
        data
      }));
    }
  },
}));
