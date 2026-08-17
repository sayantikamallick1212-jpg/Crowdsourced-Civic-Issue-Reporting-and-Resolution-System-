import React, { useEffect, useState } from "react";
import Papa from "papaparse";

const SchoolDataPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Papa.parse("gtfs/UDISE_2021_22_Table_7.11.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        setData(result.data);
        setLoading(false);
      },
      error: () => {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-200 dark:border-gray-600 border-t-green-600 dark:border-t-green-400 mb-4"></div>
          <p className="text-green-700 dark:text-green-400 font-medium">Loading school data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-green-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 rounded-2xl shadow-lg mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent mb-2">
              School Data Dashboard
            </h1>
            <p className="text-green-600 dark:text-green-400 font-medium">Education Statistics India</p>
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900 rounded-full text-sm text-green-700 dark:text-green-200 font-medium">
              <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full mr-2 animate-pulse"></div>
              {data.length} records loaded
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-100 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-xl">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Total Records</p>
                <p className="text-2xl font-bold text-green-800 dark:text-green-200">{data.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-100 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-xl">
                <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Data Columns</p>
                <p className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">
                  {data.length > 0 ? Object.keys(data[0]).length : 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-xl border border-green-100 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-700 border-b border-green-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-white">Education Data Table</h2>
            <p className="text-green-100 dark:text-green-200 text-sm mt-1">Comprehensive school statistics and metrics</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600">
                <tr>
                  {data.length > 0 &&
                    Object.keys(data[0]).map((key, index) => (
                      <th key={index} className="px-6 py-4 text-left text-sm font-semibold text-green-800 dark:text-green-200 border-b border-green-200 dark:border-gray-600 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span>{key}</span>
                          <svg className="w-4 h-4 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                          </svg>
                        </div>
                      </th>
                    ))
                  }
                </tr>
              </thead>
              <tbody className="divide-y divide-green-100 dark:divide-gray-600">
                {data.map((row, i) => (
                  <tr key={i} className="hover:bg-green-50/50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                    {Object.values(row).map((value, j) => (
                      <td key={j} className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap border-b border-green-100/50 dark:border-gray-600/50">
                        <div className="max-w-xs truncate" title={value}>
                          {value}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-green-600 dark:text-green-400 text-sm">
            Data sourced from UDISE (Unified District Information System for Education)
          </p>
          <div className="mt-2 flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-green-400 dark:bg-green-500 rounded-full"></div>
            <span className="text-green-500 dark:text-green-400 text-xs font-medium">Real-time data visualization</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolDataPage;