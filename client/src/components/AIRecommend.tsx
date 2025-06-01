import React, { useState } from "react";
import { useStore } from "../store";
import axios from "axios";
const renderMarkdownContent = (content: string) => {
  // Split content into lines and process each one
  const lines = content.split("\n");
  const elements: React.JSX.Element[] = [];
  let currentList: string[] = [];
  let inTable = false;
  let tableHeaders: string[] = [];
  let tableRows: string[][] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul
          key={elements.length}
          className="list-disc list-inside space-y-2 mb-4 ml-4"
        >
          {currentList.map((item, idx) => (
            <li
              key={idx}
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: item }}
            />
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  const flushTable = () => {
    if (tableHeaders.length > 0 && tableRows.length > 0) {
      elements.push(
        <div key={elements.length} className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                {tableHeaders.map((header, idx) => (
                  <th
                    key={idx}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tableRows.map((row, rowIdx) => (
                <tr key={rowIdx}>
                  {row.map((cell, cellIdx) => (
                    <td
                      key={cellIdx}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b"
                    >
                      <div dangerouslySetInnerHTML={{ __html: cell }} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableHeaders = [];
      tableRows = [];
      inTable = false;
    }
  };

  lines.forEach((line, index) => {
    line = line.trim();

    // Handle table detection
    if (line.includes("|") && !inTable) {
      flushList();
      inTable = true;
      tableHeaders = line
        .split("|")
        .map((h) => h.trim())
        .filter((h) => h);
      return;
    }

    if (inTable && line.includes("|") && !line.includes("---")) {
      const row = line
        .split("|")
        .map((cell) => cell.trim())
        .filter((cell) => cell);
      if (row.length > 0) {
        tableRows.push(row);
      }
      return;
    }

    if (inTable && (!line.includes("|") || line.includes("---"))) {
      flushTable();
    }

    // Skip separator lines
    if (line.includes("---")) return;

    // Headers
    if (line.startsWith("# ")) {
      flushList();
      flushTable();
      elements.push(
        <h1
          key={elements.length}
          className="text-3xl font-bold text-gray-900 mb-6 flex items-center"
        >
          {line.replace("# ", "")}
        </h1>
      );
    } else if (line.startsWith("## ")) {
      flushList();
      flushTable();
      elements.push(
        <h2
          key={elements.length}
          className="text-2xl font-semibold text-gray-800 mb-4 mt-8 border-b-2 border-blue-200 pb-2"
        >
          {line.replace("## ", "")}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      flushList();
      flushTable();
      elements.push(
        <h3
          key={elements.length}
          className="text-xl font-medium text-gray-700 mb-3 mt-6"
        >
          {line.replace("### ", "")}
        </h3>
      );
    }
    // List items
    else if (line.startsWith("- ")) {
      const listItem = line
        .replace("- ", "")
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      currentList.push(listItem);
    }
    // Bold text paragraphs
    else if (line.includes("**")) {
      flushList();
      flushTable();
      const formatted = line.replace(
        /\*\*(.*?)\*\*/g,
        '<strong class="font-semibold text-gray-900">$1</strong>'
      );
      elements.push(
        <p
          key={elements.length}
          className="text-gray-700 mb-3"
          dangerouslySetInnerHTML={{ __html: formatted }}
        />
      );
    }
    // Regular paragraphs
    else if (line && !line.includes("|")) {
      flushList();
      flushTable();
      elements.push(
        <p key={elements.length} className="text-gray-700 mb-3">
          {line}
        </p>
      );
    }
  });

  // Flush any remaining items
  flushList();
  flushTable();

  return elements;
};
const AIRecommend: React.FC<any> = () => {
  const store = useStore();

  const [loading, setLoading] = useState(false)
   const handleAIRecommend = async () => {
    if (!store.business) {
      alert("Please fetch a business profile first.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/suggestions", store.business);
      console.log("AI recommendations:", res.data);
      alert(
        "AI recommendations fetched successfully. Check console for details."
      );
      store.setAiText(res.data);
    } catch (error) {
      console.error("Error fetching AI recommendations:", error);
      alert("Failed to fetch AI recommendations. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleAICompareWithCompetitors = async () => {
    if (!store.business) {
      alert("Please select a business first.");
      return;
    }

    if (store.selectedCompetitors.length === 0) {
      alert("Please select at least one competitor to compare.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/comparison/compare", {
        business: store.business,
        competitors: store.selectedCompetitors,
      });

      
      store.setAiText(res.data);
      alert("Comparison completed! Check the AI recommendations section.");
    } catch (error) {
      console.error("Error fetching AI comparison:", error);
      alert("Failed to generate comparison. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-white rounded-xl shadow-lg p-8 m-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">AI</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Business Profile Analysis
          </h1>
        </div>
        <p className="text-gray-600">
          AI-powered recommendations based on competitor benchmarking
        </p>
        {store.business && (
        <>
          <button
            className=" bg-green-600 hover:bg-green-700 focus:ring-4
           focus:ring-green-200 text-white font-medium py-2 
           px-4 rounded-lg transition-colors duration-200 focus:outline-none mt-4 text-sm"
            onClick={handleAIRecommend}
            disabled={loading}
          >
           {loading ? "Loading..." : "Get AI Recommendations"}
          </button>

          <button
            className="bg-green-600 hover:bg-green-700 focus:ring-4
           focus:ring-blue-200 text-white font-medium py-2 
           px-4 rounded-lg transition-colors duration-200 focus:outline-none mt-4 text-sm"
            onClick={handleAICompareWithCompetitors}
            disabled={loading || store.selectedCompetitors.length === 0}
          >
            {loading ? "Loading..." : <span>Get AI compare + recommend again {store.selectedCompetitors.length}{" "}
            competitor you picked</span>}
          </button>
        </>
      )}
      </div>

      
      

      {/* Content */}
      <div className="prose max-w-none">
        {loading && (
          <div className="flex items-center justify-center py-6">
            <svg
              className="animate-spin h-8 w-8 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2.93 6.364A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3.93-1.574zM12 20a8 8 0 008-8h-4a4 4 0 01-4 4v4zm6.364-2.93A7.962 7.962 0 0120 12h4c0 3.042-1.135 5.824-3 7.938l-3.636-1.868zM12 4a8 8 0 00-8 8h4a4 4 0 014-4V4z"
              ></path>
            </svg>
          </div>)}
        {store.aiText && (
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">AI Recommendations</h2>
            <div className="text-gray-700 whitespace-pre-wrap">
              {renderMarkdownContent(store.aiText)}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 pt-6 mt-8">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Generated by AI Assistant</span>
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default AIRecommend;
