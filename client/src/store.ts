import {create} from "zustand"
import type { BusinessProfile, SearchResult } from "./types"

interface StoreState {
    business: BusinessProfile | null;
    setBusiness: (business: BusinessProfile|null) => void;
    searchResult: SearchResult[] | [];
    setSearchResult: (searchResult: SearchResult[]) => void;
    aiText: string;
    setAiText: (text: string) => void;
    selectedCompetitors: BusinessProfile[] | [];
    setSelectedCompetitors: (competitors: BusinessProfile[]) => void;
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
    selectedCompetitors: [] as BusinessProfile[],
    setSelectedCompetitors: (competitors: BusinessProfile[]) => set({ selectedCompetitors: competitors }),
    competitors: [] as BusinessProfile[],
    setCompetitors: (competitors: BusinessProfile[]) => set({ competitors }),   
}))