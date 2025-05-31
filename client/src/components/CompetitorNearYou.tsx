import axios from "axios";
import { useStore } from "../store";
import type { BusinessProfile } from "../types";
import { useEffect, useState } from "react";

const CompetitorNearYou = () => {
  const store = useStore();
  const [Loading, setLoading] = useState(false)

  useEffect(() => {
    // Clear previous competitors when business changes
    if (store.business) {
      store.setCompetitors([]); // Clear previous competitors
      console.log("Business changed, clearing competitors");
    }
  }, [store.business]); // Watch for changes to the business

  const handleGetCompetitor = async () => {
    const currentBussiness = store.business;
    const query = currentBussiness?.amenities?.join(" ") || "";
    const latitude = currentBussiness?.latitude || 0;
    const longitude = currentBussiness?.longitude || 0;
    try {
      setLoading(true);
      const response = await axios.post("/api/business/competitors", {
        query,
        latitude,
        longitude,
      });
      console.log("Competitors fetched successfully:", response.data);
      store.setCompetitors(response.data);
    } catch (error) {
      console.error("Error fetching competitors:", error);
      alert("Failed to fetch competitors. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCompetitor = (competitor: BusinessProfile) => {
    const isSelected = store.selectedCompetitors.some(
      (selected) => selected.id === competitor.id
    );

    let updatedSelectedCompetitors;
    if (isSelected) {
      updatedSelectedCompetitors = store.selectedCompetitors.filter(
        (selected) => selected.id !== competitor.id
      );
    } else {
      updatedSelectedCompetitors = [...store.selectedCompetitors, competitor];
    }

    store.setSelectedCompetitors(updatedSelectedCompetitors);
    console.log("Selected competitors updated:", updatedSelectedCompetitors);
  };
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Competitors Near You
      </h2>
      <p className="text-gray-600">
        Discover businesses similar to yours in your area.
      </p>
      {store.competitors.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {store.competitors.map((competitor) => (
            <li
              key={competitor.id}
              className="p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition-colors"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {competitor.name}
              </h3>
              <p className="text-gray-600">{competitor.category}</p>
              <p className="text-gray-500">{competitor.address}</p>
              {
                <button
                  className={`mt-2 px-3 py-1 rounded text-sm font-medium ${
                    store.selectedCompetitors.some(
                      (selected) => selected.id === competitor.id
                    )
                      ? "bg-green-500 text-white"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                  onClick={() => handleSelectCompetitor(competitor)}
                >
                  {store.selectedCompetitors.some(
                    (selected) => selected.id === competitor.id
                  )
                    ? "Unselect"
                    : "Select"}
                </button>
              }
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mt-4">No competitors found.</p>
      )}

      <button
        className="bg-amber-500 rounded-xl px-3 py-5 mt-2 text-white font-semibold"
        type="button"
        onClick={handleGetCompetitor}
      >
        Click here{" "}
      </button>
    </div>
  );
};

export default CompetitorNearYou;
