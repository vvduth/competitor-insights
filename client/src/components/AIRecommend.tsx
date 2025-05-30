import React from "react";
import { useStore } from "../store";
import { MOCK_AI_CONTENT } from "../types/mockAIcontent";

// Parse the markdown content into sections
const parseContent = (content: string) => {
  const sections = content.split("---").filter((section) => section.trim());
  return sections;
};

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
      </div>

      {/* Content */}
      <div className="prose max-w-none">
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
