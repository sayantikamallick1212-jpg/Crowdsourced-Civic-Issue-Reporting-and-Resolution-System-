import React, { useState, useEffect } from "react";
import Papa from "papaparse";

const TrainSchedule = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCSV = async () => {
      try {
        const response = await fetch("/gtfs/Train_details_22122017.csv");
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const csvText = await response.text();
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (header) => header.trim().toLowerCase(),
          complete: (result) => {
            setData(result.data);
            setLoading(false);
            console.log("CSV data loaded:", result.data.length, "rows");
          },
          error: (err) => {
            console.error("CSV parse error:", err);
            setLoading(false);
          },
        });
      } catch (err) {
        console.error("Fetch error:", err);
        setLoading(false);
      }
    };
    fetchCSV();
  }, []);

  const filteredData = data.filter(
    (train) =>
      train["train name"]?.toLowerCase().includes(search.toLowerCase()) ||
      train["station name"]?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50/80 via-emerald-50/60 to-teal-50/80 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JhcGgiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDEwMCAwIEwgMCAwIDAgMTAwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMzQsIDE5NywgOTQsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmFwaCkiLz48L3N2Zz4=')] opacity-30"></div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-xl opacity-40 animate-pulse"></div>
          <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-12 border border-green-200/50 shadow-2xl text-center">
            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
              Loading Train Data
            </h2>
            <div className="flex space-x-1 justify-center">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/80 via-emerald-50/60 to-teal-50/80 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JhcGgiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDEwMCAwIEwgMCAwIDAgMTAwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMzQsIDE5NywgOTQsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmFwaCkiLz48L3N2Zz4=')] opacity-30"></div>
      
      <div className="relative bg-white/95 backdrop-blur-xl border-b border-green-200/50 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
              </svg>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Train Schedule
              </h1>
              <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mt-2 w-32 mx-auto"></div>
              <p className="text-emerald-600 font-semibold mt-2">Powered by Civix</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-8 py-8">
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl border border-green-100/50 shadow-lg">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <svg className="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search trains or stations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-16 pr-8 py-6 bg-transparent border-0 rounded-3xl focus:outline-none placeholder-gray-500 text-gray-800 text-lg font-medium focus:ring-2 focus:ring-green-500/20 transition-all duration-200"
              />
            </div>
          </div>
        </div>

        <div className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
          <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl border border-green-100/50 shadow-2xl overflow-hidden">
            
            <div className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 px-8 py-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r opacity-10">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
              </div>
              <div className="relative flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Train Schedule Data</h2>
                <div className="bg-white/10 rounded-xl px-4 py-2 backdrop-blur-sm">
                  <span className="text-white font-bold">{filteredData.length} results</span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-green-100">
                    {["Train No", "Train Name", "SEQ", "Station Code", "Station Name", "Arrival Time", "Departure Time", "Distance", "Source Station", "Source Station Name", "Destination Station", "Destination Station Name"].map((header) => (
                      <th key={header} className="text-left py-4 px-6 font-bold text-gray-700 tracking-wide uppercase text-xs bg-gradient-to-r from-green-50 to-emerald-50 first:rounded-l-xl last:rounded-r-xl whitespace-nowrap">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-green-50">
                  {filteredData.map((row, index) => (
                    <tr key={index} className="hover:bg-gradient-to-r hover:from-green-50/50 hover:to-emerald-50/50 transition-all duration-200 group/row">
                      <td className="px-6 py-4 text-sm font-mono text-emerald-700 font-semibold">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover/row:opacity-100 transition-opacity duration-200"></div>
                          <span>{row["train no"]}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 group-hover/row:text-emerald-700 transition-colors">
                        {row["train name"]}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row["seq"]}</td>
                      <td className="px-6 py-4 text-sm font-mono text-emerald-600">{row["station code"]}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-700">{row["station name"]}</td>
                      <td className="px-6 py-4 text-sm font-mono text-blue-600">{row["arrival time"]}</td>
                      <td className="px-6 py-4 text-sm font-mono text-orange-600">{row["departure time"]}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row["distance"]} km</td>
                      <td className="px-6 py-4 text-sm font-mono text-emerald-600">{row["source station"]}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row["source station name"]}</td>
                      <td className="px-6 py-4 text-sm font-mono text-emerald-600">{row["destination station"]}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row["destination station name"]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredData.length === 0 && !loading && (
              <div className="text-center py-20">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full blur-xl opacity-20"></div>
                  <div className="relative bg-gradient-to-r from-emerald-100 to-green-100 p-8 rounded-3xl max-w-md mx-auto">
                    <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.563M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">No Trains Found</h3>
                    <p className="text-gray-600 font-medium">Try adjusting your search criteria</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainSchedule;