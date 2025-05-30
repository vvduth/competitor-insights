import {create} from "zustand"
import type { BusinessProfile } from "./types"

interface StoreState {
    business: BusinessProfile | null;
    setBusiness: (business: BusinessProfile) => void;
    competitors: BusinessProfile[];
    setCompetitors: (competitors: BusinessProfile[]) => void;
}

export const useStore = create<StoreState>((set) => ({
    business: null as BusinessProfile | null,
    setBusiness: (business:BusinessProfile) => set({ business }),
    competitors: [] as BusinessProfile[],
    setCompetitors: (competitors: BusinessProfile[]) => set({ competitors }),   
}))