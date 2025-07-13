import { AlignEndHorizontal, ArrowDownCircle } from "lucide-react";
import React from "react";

function DashboardCard({ data, label }) {
  return (
    <div className={`w-full rounded-xl  shadow-lg border bg-white border-indigo-200/50 hover:shadow-xl transition-all duration-300 px-4 py-6 flex flex-col space-y-3 ${label === "All Jobs" ? "bg-gradient-to-br from-indigo-50 via-indigo-100 to-indigo-200" : ""}`}>
      <div className="w-full flex items-center justify-between">
        <p className="font-semibold tracking-wide">{label}</p>
        <AlignEndHorizontal className="size-4 rounded-full p-2 bg-white"/>
      </div>
      <p className="text-4xl font-bold text-white text-left">
        {data}
      </p>
    </div>
  );
}

export default DashboardCard;
