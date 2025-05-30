import {create} from "zustand"
import type { BusinessProfile, SearchResult } from "./types"

interface StoreState {
    business: BusinessProfile | null;
    setBusiness: (business: BusinessProfile|null) => void;
    searchResult: SearchResult[] | [];
    setSearchResult: (searchResult: SearchResult[]) => void;
    aiText: string;
    setAiText: (text: string) => void;
    competitors: BusinessProfile[];
    setCompetitors: (competitors: BusinessProfile[]) => void;
}

export const useStore = create<StoreState>((set) => ({
    business: null as BusinessProfile | null,
    setBusiness: (business:BusinessProfile|null) => set({ business }),
    aiText: "",
    searchResult: [],
    setSearchResult: (searchResult: SearchResult[]) => set({ searchResult }),
    setAiText: (text: string) => set({ aiText: text }),
    competitors: [] as BusinessProfile[],
    setCompetitors: (competitors: BusinessProfile[]) => set({ competitors }),   
}))