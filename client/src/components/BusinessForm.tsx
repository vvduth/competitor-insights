import { useState } from "react";
import axios from "axios";
import { useStore } from "../store";
import type { BusinessProfile } from "../types";

const BusinessForm = () => {
  const [businessName, setBusinessName] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const store = useStore();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    store.setBusiness(null); // Reset business profile on new search
    store.setSelectedCompetitors([]); // Reset selected competitors on new search
    store.setSearchResult([]); // Reset search results on new search
    if (!businessName.trim()) {
      alert("Please enter a valid business name.");
      return;
    }

    try {
      setisLoading(true);
      console.log("Fetching data for:", encodeURIComponent(businessName));
      const res = await axios.post("/api/business", {
        businessName: businessName.trim(),
      });
      //store.setBusiness(res.data as BusinessProfile);

      console.log("Business data fetched successfully:", res.data);

      store.setSearchResult(res.data);
    } catch (error) {
      console.error("Error fetching business data:", error);
      alert("Failed to fetch business data. Please try again later.");
    } finally {
      setisLoading(false);
    }
  };

  const handleBussinessSelect = async (cid: string) => {
    try {
      setisLoading(true);
      const res = await axios.get(`/api/business/${cid}`);
      console.log("Business profile fetched successfully:", res.data);
      store.setBusiness(res.data as BusinessProfile);
    } catch (error) {
      console.error("Error fetching business profile:", error);
      alert("Failed to fetch business profile. Please try again later.");
    } finally {
      setisLoading(false);
    }
  };

 
  return (
    <>
      <form className="space-y-6">
        <div>
          <label
            htmlFor="business-name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Business Name
          </label>
          <input
            id="business-name"
            type="text"
            placeholder="e.g., Tony's Pizza Downtown"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400"
            aria-describedby="business-name-help"
            required
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
          <p id="business-name-help" className="mt-2 text-sm text-gray-500">
            Enter the full name of the business you want to analyze
          </p>
        </div>
        {store.searchResult.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              we found {store.searchResult.length} results for "{businessName}":
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              {store.searchResult.map((result) => (
                <li key={result.cid} className="text-gray-700">
                  {result.title} - {result.address}
                  <button
                    className="ml-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-md transition-colors duration-200"
                    onClick={() => handleBussinessSelect(result.cid)}
                    type="button"
                    disabled={isLoading}
                    aria-label={`Analyze ${result.title}`}
                  >
                    {isLoading ? "Loading info..." : "Analyze"}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-4
           focus:ring-blue-200 text-white font-semibold py-3 
           px-6 rounded-lg transition-colors duration-200 focus:outline-none"
          aria-describedby="analyze-button-help"
          onClick={handleFormSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : "Search for Business Profile"}
        </button>
        <p id="analyze-button-help" className="sr-only">
          Click to fetch and analyze business profile data
        </p>
      </form>

    </>
  );
};

export default BusinessForm;
