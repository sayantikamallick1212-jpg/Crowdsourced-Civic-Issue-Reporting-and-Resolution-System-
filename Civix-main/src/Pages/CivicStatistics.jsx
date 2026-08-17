import { useEffect, useState } from "react";
import Papa from "papaparse";
import { Search, Users, Droplets, Download, FileText, BarChart3 } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function CsvDashboard() {
  const [populationData, setPopulationData] = useState([]);
  const [waterData, setWaterData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    Papa.parse("gtfs/population.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => setPopulationData(result.data),
    });

    Papa.parse("gtfs/water.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => setWaterData(result.data),
    });
  }, []);

  const filteredPopulation = populationData.filter((row) =>
    row["India/State/Union Territory"]?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredWater = waterData.filter((row) =>
    row["District"]?.toLowerCase().includes(search.toLowerCase())
  );

  const exportCSV = (data, filename) => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  const exportPDF = (data, headers, filename, title) => {
    const doc = new jsPDF();
    doc.text(title, 14, 10);
    autoTable(doc, {
      head: [headers],
      body: data.map((row) => headers.map((h) => row[h] || "")),
      startY: 20,
    });
    doc.save(filename);
  };

  const StatCard = ({ icon: Icon, title, value, bgColor, textColor, iconBg }) => (
    <div className={`${bgColor} p-6 rounded-2xl border border-green-100/50 shadow-sm hover:shadow-md transition-all duration-300`}>
      <div className="flex items-center gap-4">
        <div className={`p-3 ${iconBg} rounded-xl`}>
          <Icon className={`w-6 h-6 ${textColor}`} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
        </div>
      </div>
    </div>
  );

  const ExportButtons = ({ onCSV, onPDF }) => (
    <div className="flex gap-2">
      {[
        { onClick: onCSV, icon: FileText, label: "CSV" },
        { onClick: onPDF, icon: BarChart3, label: "PDF" }
      ].map(({ onClick, icon: Icon, label }) => (
        <button
          key={label}
          onClick={onClick}
          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
        >
          <Icon className="w-4 h-4" />
          {label}
        </button>
      ))}
    </div>
  );

  const TableHeader = ({ children, className = "" }) => (
    <th className={`text-left py-3 px-4 font-semibold text-sm ${className}`}>
      {children}
    </th>
  );

  const TableCell = ({ children, className = "" }) => (
    <td className={`py-3 px-4 text-sm ${className}`}>
      {children}
    </td>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/30 to-emerald-50/20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Civic Statistics Dashboard
            </h1>
            <p className="text-gray-600">Population & Water Resources Analytics</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Search */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search states or districts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard
            icon={Users}
            title="Total States/UTs"
            value={filteredPopulation.length}
            bgColor="bg-white"
            textColor="text-green-600"
            iconBg="bg-green-100"
          />
          <StatCard
            icon={Droplets}
            title="Total Districts (South India)"
            value={filteredWater.length}
            bgColor="bg-white"
            textColor="text-emerald-600"
            iconBg="bg-emerald-100"
          />
        </div>

        {/* Population Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex justify-between items-center bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-white" />
              <h2 className="text-lg font-semibold text-white">Population Data (2011)</h2>
            </div>
            <ExportButtons
              onCSV={() => exportCSV(filteredPopulation, "population_data.csv")}
              onPDF={() => exportPDF(
                filteredPopulation,
                ["India/State/Union Territory", "Population 2011", "Decadal Population Growth Rate 2001-2011", "Population Density (per sq.km) - 2011"],
                "population_data.pdf",
                "Population Data (2011)"
              )}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <TableHeader className="text-gray-700">State/UT</TableHeader>
                  <TableHeader className="text-gray-700">Population</TableHeader>
                  <TableHeader className="text-gray-700">Growth Rate</TableHeader>
                  <TableHeader className="text-gray-700">Density</TableHeader>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPopulation.length > 0 ? (
                  filteredPopulation.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors duration-150">
                      <TableCell className="font-medium text-gray-900">
                        {row["India/State/Union Territory"]}
                      </TableCell>
                      <TableCell className="text-gray-600">{row["Population 2011"]}</TableCell>
                      <TableCell className="text-gray-600">{row["Decadal Population Growth Rate 2001-2011"]}</TableCell>
                      <TableCell className="text-gray-600">{row["Population Density (per sq.km) - 2011"]}</TableCell>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-8 text-gray-500">No matching results found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Water Resources Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex justify-between items-center bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-4">
            <div className="flex items-center gap-3">
              <Droplets className="w-5 h-5 text-white" />
              <h2 className="text-lg font-semibold text-white">Water Resources Data</h2>
            </div>
            <ExportButtons
              onCSV={() => exportCSV(filteredWater, "water_data.csv")}
              onPDF={() => exportPDF(
                filteredWater,
                ["District", "Canals no.", "Canals Length (Km.)", "Tube Wells & Other Wells", "Open Wells", "Wells used for Domestic Purpose only", "Reservoirs", "Tanks"],
                "water_data.pdf",
                "Water Resources Data"
              )}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {["District", "Canals No.", "Canals Length", "Tube Wells", "Open Wells", "Domestic Wells", "Reservoirs", "Tanks"].map(header => (
                    <TableHeader key={header} className="text-gray-700 min-w-24">{header}</TableHeader>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredWater.length > 0 ? (
                  filteredWater.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors duration-150">
                      <TableCell className="font-medium text-gray-900">{row["District"]}</TableCell>
                      <TableCell className="text-gray-600">{row["Canals no."]}</TableCell>
                      <TableCell className="text-gray-600">{row["Canals Length (Km.)"]}</TableCell>
                      <TableCell className="text-gray-600">{row["Tube Wells & Other Wells"]}</TableCell>
                      <TableCell className="text-gray-600">{row["Open Wells"]}</TableCell>
                      <TableCell className="text-gray-600">{row["Wells used for Domestic Purpose only"]}</TableCell>
                      <TableCell className="text-gray-600">{row["Reservoirs"]}</TableCell>
                      <TableCell className="text-gray-600">{row["Tanks"]}</TableCell>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-8 text-gray-500">No matching results found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}