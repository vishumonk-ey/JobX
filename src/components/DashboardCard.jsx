import { AlignEndHorizontal, ArrowDownCircle } from "lucide-react";
import React from "react";

function DashboardCard({ data, label }) {
  return (
    <div
      className={`group w-full rounded-xl  shadow-lg border bg-white border-indigo-200/50 hover:shadow-xl transition-all duration-300 px-4 py-6 flex flex-col space-y-3 ${
        label === "Total Applied"
          ? "bg-gradient-to-br from-indigo-50 via-indigo-100 to-indigo-200"
          : ""
      }`}
    >
      <div className="w-full flex items-center justify-between">
        <p className="font-semibold tracking-wide text-xl">{label}</p>
        <div className="p-2 rounded-full group-hover:bg-indigo-100 transition duration-700 ">
          <AlignEndHorizontal/>
        </div>
      </div>
      <p className="text-4xl font-bold text-white text-left">{data || "100"}</p>
    </div>
  );
}

export default DashboardCard;
