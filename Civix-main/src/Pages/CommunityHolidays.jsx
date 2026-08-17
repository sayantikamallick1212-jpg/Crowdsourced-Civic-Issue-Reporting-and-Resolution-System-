import { useEffect, useState } from "react";
import { Loader2, Calendar, AlertCircle, Globe, Sparkles, MapPin } from "lucide-react";

export default function Holidays() {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [country, setCountry] = useState("IN");

  const year = new Date().getFullYear();
  const today = new Date().toISOString().split("T")[0];

  const countries = [
    { code: "IN", name: "India", flag: "🇮🇳" },
    { code: "US", name: "USA", flag: "🇺🇸" },
    { code: "GB", name: "UK", flag: "🇬🇧" },
    { code: "CA", name: "Canada", flag: "🇨🇦" },
    { code: "AU", name: "Australia", flag: "🇦🇺" }
  ];

  useEffect(() => {
    setLoading(true);
    setError("");
    // Mock data only
    const mockHolidays = [
      {
        name: "New Year's Day",
        date: { iso: "2025-01-01" },
        description: "The first day of the Gregorian calendar year"
      },
      {
        name: "Republic Day",
        date: { iso: "2025-01-26" },
        description: "National holiday commemorating the adoption of the Constitution of India"
      },
      {
        name: "Independence Day",
        date: { iso: "2025-08-15" },
        description: "National holiday commemorating India's independence from British rule"
      },
      {
        name: "Gandhi Jayanti",
        date: { iso: "2025-10-02" },
        description: "Birthday of Mahatma Gandhi, celebrated as International Day of Non-Violence"
      },
      {
        name: "Diwali",
        date: { iso: "2025-10-20" },
        description: "Festival of lights celebrated by Hindus, Jains, and Sikhs"
      },
      {
        name: "Christmas Day",
        date: { iso: "2025-12-25" },
        description: "Christian holiday celebrating the birth of Jesus Christ"
      }
    ];
    setTimeout(() => {
      setHolidays(mockHolidays);
      setLoading(false);
    }, 1000);
  }, [country]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  };

  const getMonthFromDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short' });
  };

  const getDayFromDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.getDate();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/40 via-white to-emerald-50/60 dark:from-emerald-950 dark:via-gray-900 dark:to-green-950 p-6">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-7">
          <div className="flex items-center gap-5">
            <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-5 rounded-[2rem] shadow-lg">
              <Calendar className="w-9 h-9 text-white" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-emerald-700 via-green-700 to-emerald-500 bg-clip-text text-transparent mb-1 tracking-tighter">
                Holidays {year}
              </h1>
              <p className="text-green-800/80 dark:text-emerald-200/80 font-medium">
                Discover celebrations around the world
              </p>
            </div>
          </div>
          {/* Country Selector */}
          <div className="relative group">
            <div className="flex items-center gap-3 bg-white/90 dark:bg-emerald-950/70 backdrop-blur border-2 border-emerald-100/60 dark:border-emerald-800/60 rounded-2xl px-5 py-3 shadow-lg hover:shadow-emerald-100/30 transition hover:border-emerald-400">
              <Globe className="w-5 h-5 text-emerald-500" />
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="bg-transparent outline-none text-emerald-800 dark:text-emerald-100 font-bold cursor-pointer"
              >
                {countries.map(c => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
              <MapPin className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <Loader2 className="w-14 h-14 animate-spin text-emerald-500" />
              <div className="absolute inset-0 w-14 h-14 border-4 border-emerald-200 rounded-full animate-pulse"></div>
            </div>
            <p className="mt-4 text-green-900/80 dark:text-emerald-200 font-medium text-xl">Discovering holidays...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="p-6 rounded-2xl border-2 border-red-200 bg-gradient-to-r from-red-50 to-pink-50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-600" />
              <p className="text-red-700 font-semibold">{error}</p>
            </div>
          </div>
        )}

        {/* Holidays Grid */}
        {!loading && !error && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {holidays.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-20">
                <div className="w-24 h-24 bg-emerald-50 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-5">
                  <Calendar className="w-12 h-12 text-emerald-400" />
                </div>
                <p className="text-emerald-700 dark:text-emerald-200 text-lg font-medium">No holidays found for {year}</p>
                <p className="text-emerald-500/70 dark:text-emerald-300 mt-2">Try selecting a different country</p>
              </div>
            ) : (
              holidays.map((holiday, idx) => {
                const isToday = holiday.date.iso === today;
                const isPast = new Date(holiday.date.iso) < new Date(today);
                return (
                  <div
                    key={idx}
                    className={`group relative overflow-hidden rounded-3xl border-2 p-7 shadow-xl bg-gradient-to-br duration-300 transition-all hover:shadow-emerald-100/40 hover:scale-[1.025] hover:border-emerald-400
                      ${isToday
                        ? "from-green-100 to-emerald-100 border-emerald-400 shadow-emerald-200"
                        : isPast
                        ? "from-gray-100 to-gray-50 border-gray-200 shadow"
                        : "from-white to-green-50/40 border-emerald-200/60"}
                    `}
                  >
                    {/* Date badge */}
                    <div className={`absolute top-6 right-6 w-16 h-16 rounded-2xl flex flex-col items-center justify-center text-white font-extrabold tracking-tight shadow-lg
                      ${isToday
                        ? "bg-gradient-to-br from-emerald-500 to-green-600"
                        : "bg-gradient-to-br from-emerald-300 to-green-400"}
                    `}>
                      <span className="text-xs">{getMonthFromDate(holiday.date.iso)}</span>
                      <span className="text-2xl">{getDayFromDate(holiday.date.iso)}</span>
                    </div>

                    {/* TODAY badge */}
                    {isToday && (
                      <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full animate-pulse shadow shadow-emerald-400">
                        <Sparkles className="w-3 h-3" />
                        Today!
                      </div>
                    )}

                    {/* Holiday Info */}
                    <div className="mt-5 space-y-3">
                      <h3 className={`text-xl font-extrabold leading-tight ${isPast ? "text-gray-500" : "text-emerald-900 dark:text-emerald-100"}`}>
                        {holiday.name}
                      </h3>
                      <p className={`text-sm font-semibold ${isPast ? "text-gray-500" : "text-emerald-700 dark:text-emerald-300"}`}>
                        {formatDate(holiday.date.iso)}
                      </p>
                      {holiday.description && (
                        <p className={`text-base ${isPast ? "text-gray-400" : "text-emerald-800 dark:text-emerald-200"}`}>{holiday.description}</p>
                      )}
                    </div>

                    {/* Decorative orb */}
                    <div className="absolute -bottom-4 -right-4 w-28 h-24 bg-gradient-to-br from-green-200/10 to-emerald-200/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-400"></div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
