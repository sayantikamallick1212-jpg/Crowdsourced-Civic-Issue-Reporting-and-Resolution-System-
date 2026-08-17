// pages/MedicalInfo.jsx
import { ArrowLeft, Phone, Hospital, ShieldCheck, Pill, AlertTriangle, HeartPulse, User2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const demo = {
  name: "Aarav Sharma",
  age: 24,
  blood: "B+",
  allergies: ["Peanuts", "Penicillin"],
  meds: ["Cetirizine (SOS)"],
  conditions: ["Mild Asthma"],
  doctor: { name: "Dr. Verma", phone: "+91111222333", hospital: "CityCare Hospital" },
  contacts: [
    { name: "Mom", phone: "+919999888877" },
    { name: "Best Friend", phone: "+919876543210" },
  ],
};

export default function MedicalInfo() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-slate-700 hover:text-black"
      >
        <ArrowLeft /> Back
      </button>

      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-6 shadow-md">
        <h1 className="text-3xl font-bold">{demo.name}</h1>
        <p className="mt-1 text-lg">Age {demo.age}</p>
        <span className="mt-2 inline-block bg-white text-rose-600 font-semibold px-3 py-1 rounded-full shadow">
          Blood Group: {demo.blood}
        </span>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Medical Details */}
          <div className="rounded-2xl border bg-white shadow-sm p-6">
            <h3 className="font-semibold text-xl mb-4 flex items-center gap-2">
              <HeartPulse className="text-rose-500" /> Health Information
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Card title="Allergies" items={demo.allergies} icon={<AlertTriangle className="text-red-500 w-4 h-4" />} />
              <Card title="Medications" items={demo.meds} icon={<Pill className="text-green-500 w-4 h-4" />} />
              <Card title="Conditions" items={demo.conditions} icon={<ShieldCheck className="text-blue-500 w-4 h-4" />} />
              <div className="rounded-xl border p-4 bg-slate-50">
                <div className="flex items-center gap-2 font-semibold text-slate-700">
                  <ShieldCheck className="text-emerald-600" /> Insurance
                </div>
                <p className="text-sm text-slate-600 mt-1">Add provider, ID, and emergency notes.</p>
              </div>
            </div>
          </div>

          {/* Doctor Card */}
          <div className="rounded-2xl border bg-white shadow-sm p-6">
            <div className="flex items-center gap-3 font-semibold text-lg">
              <Hospital className="text-rose-600" /> Primary Doctor
            </div>
            <p className="mt-3 text-lg font-medium">{demo.doctor.name}</p>
            <p className="text-slate-600">{demo.doctor.hospital}</p>
            <a
              href={`tel:${demo.doctor.phone}`}
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            >
              <Phone className="w-4 h-4" /> Call Doctor
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          {/* Emergency Contacts */}
          <div className="rounded-2xl border bg-white shadow-sm p-6">
            <h4 className="font-semibold mb-4 text-lg flex items-center gap-2">
              <User2 className="text-indigo-600" /> Emergency Contacts
            </h4>
            <ul className="space-y-4">
              {demo.contacts.map((c, i) => (
                <li key={i} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{c.name}</p>
                    <p className="text-sm text-slate-600">{c.phone}</p>
                  </div>
                  <a
                    className="px-4 py-2 rounded-lg bg-rose-600 text-white hover:bg-rose-700"
                    href={`tel:${c.phone}`}
                  >
                    Call
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* QR Code */}
          <div className="rounded-2xl border bg-white shadow-sm p-6 text-center">
            <p className="text-sm text-slate-600 mb-3">Scan for full medical history</p>
            <div className="mx-auto h-40 w-40 bg-slate-200 rounded-lg shadow-inner" />
            <button className="mt-4 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
              Download QR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, items, icon }) {
  return (
    <div className="rounded-xl border p-4 bg-slate-50 shadow-sm">
      <div className="flex items-center gap-2 font-semibold text-slate-700">
        {icon} {title}
      </div>
      <ul className="mt-2 list-disc ml-5 text-sm text-slate-700 space-y-1">
        {items.map((x, i) => <li key={i}>{x}</li>)}
      </ul>
    </div>
  );
}
