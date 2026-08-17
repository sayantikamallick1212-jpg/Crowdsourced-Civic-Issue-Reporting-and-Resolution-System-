import { useState } from "react";
import { Lock, AlertTriangle, Save, Phone, Mail, MapPin } from "lucide-react";

export default function SafeWordSetup() {
  const [safeWord, setSafeWord] = useState("");
  const [confirmSafeWord, setConfirmSafeWord] = useState("");
  const [contacts, setContacts] = useState(["+91 9876543210", "help@example.com"]);
  const [message, setMessage] = useState("");

  const handleSave = () => {
    if (!safeWord || safeWord !== confirmSafeWord) {
      setMessage("❌ Safe words do not match!");
      return;
    }
    setMessage("✅ Safe word saved successfully!");
  };

  const handleTrigger = () => {
    setMessage("🚨 Alert triggered! Contacts notified.");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Safe Word Setup</h1>

      {/* Safe Word Inputs */}
      <div className="bg-white shadow-md rounded-2xl p-4 space-y-4">
        <div>
          <label className="flex items-center gap-2 font-medium mb-1">
            <Lock className="w-5 h-5 text-gray-600" /> Enter Safe Word
          </label>
          <input
            type="text"
            value={safeWord}
            onChange={(e) => setSafeWord(e.target.value)}
            placeholder="Enter your safe word"
            className="w-full border rounded-lg px-3 py-2 focus:outline-blue-500"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 font-medium mb-1">
            <Lock className="w-5 h-5 text-gray-600" /> Confirm Safe Word
          </label>
          <input
            type="text"
            value={confirmSafeWord}
            onChange={(e) => setConfirmSafeWord(e.target.value)}
            placeholder="Re-enter your safe word"
            className="w-full border rounded-lg px-3 py-2 focus:outline-blue-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
          >
            <Save className="inline-block w-4 h-4 mr-2" />
            Save
          </button>

          <button
            onClick={handleTrigger}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow"
          >
            <AlertTriangle className="inline-block w-4 h-4 mr-2" />
            Trigger Alert
          </button>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-gray-50 border rounded-2xl mt-6 p-4">
        <h2 className="text-lg font-semibold mb-2">Emergency Contacts</h2>
        <ul className="space-y-2">
          {contacts.map((c, i) => (
            <li
              key={i}
              className="flex items-center gap-2 bg-white shadow rounded-lg p-2"
            >
              {c.includes("@") ? (
                <Mail className="text-blue-600 w-5 h-5" />
              ) : (
                <Phone className="text-green-600 w-5 h-5" />
              )}
              {c}
            </li>
          ))}
        </ul>
        <button className="mt-3 bg-gray-700 text-white px-3 py-2 rounded-lg hover:bg-gray-800">
          + Add Contact
        </button>
      </div>

      {/* Extra Options */}
      <div className="bg-gray-50 border rounded-2xl mt-6 p-4">
        <h2 className="text-lg font-semibold mb-2">Alert Options</h2>
        <div className="flex items-center gap-2">
          <input type="checkbox" className="w-4 h-4" defaultChecked />
          <label>Send Location</label>
          <MapPin className="w-4 h-4 text-red-500" />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" className="w-4 h-4" defaultChecked />
          <label>Send Email + SMS</label>
        </div>
      </div>

      {/* Status Message */}
      {message && (
        <div className="mt-4 p-3 bg-yellow-100 text-yellow-800 rounded-lg shadow">
          {message}
        </div>
      )}
    </div>
  );
}
