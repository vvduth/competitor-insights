import { useState } from "react"
import axios from "axios"

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000"
function App() {
  const [businessName, setBusinessName] = useState("")

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!businessName.trim()) {
      alert("Please enter a valid business name.")
      return
    }
    
    try {
      console.log("Fetching data for:", encodeURIComponent(businessName))
      const res = await axios.get(`${SERVER_URL}/api/business/${encodeURIComponent(businessName)}`)
      console.log("Business data fetched successfully:", res.data)
    } catch (error) {
      console.error("Error fetching business data:", error)
      alert("Failed to fetch business data. Please try again later.")
    }
  }
  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Business Insights
            </h1>
            <p className="text-gray-600">
              Discover competitor insights for your business
            </p>
          </div>
          
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
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none"
              aria-describedby="analyze-button-help"
              onClick={handleFormSubmit}
            >
              Analyze Business
            </button>
            <p id="analyze-button-help" className="sr-only">
              Click to fetch and analyze business profile data
            </p>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
