import React from "react";
import {
  EllipsisVertical,
  Edit3,
  Trash2,
  Eye,
  MoreHorizontal,
} from "lucide-react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Link } from "react-router-dom";

// Sample data for testing
const data = {
  CompanyName: "TechCorp Solutions",
  Role: "Senior Frontend Developer",
  Status: "Interview",
  DateApplied: "2024-01-15",
};

// More sample data objects for different scenarios
const sampleJobDataArray = [
  {
    CompanyName: "TechCorp Solutions",
    Role: "Senior Frontend Developer",
    Status: "Interview",
    DateApplied: "2024-01-15",
  },
  {
    CompanyName: "InnovateSoft Inc",
    Role: "Full Stack Engineer",
    Status: "Offer",
    DateApplied: "2024-01-10",
  },
  {
    CompanyName: "DataFlow Systems",
    Role: "React Developer",
    Status: "Rejected",
    DateApplied: "2024-01-08",
  },
  {
    CompanyName: "CloudTech Solutions",
    Role: "UI/UX Designer",
    Status: "Applied",
    DateApplied: "2024-01-12",
  },
];

function JobItem() {
  return (
    <div className="w-full p-2 border-b  border-b-indigo-200 overflow-x-auto scrollbar-hide">
      <div className="w-full flex items-center overflow-x-auto scrollbar-hide">
        <p className="flex-1 min-w-[200px] text-left text-base md:text-lg">
          {data.CompanyName}
        </p>
        <p className="flex-1 min-w-[200px] text-left text-base md:text-lg">
          {data.Role}
        </p>
        <div className="flex-1 min-w-[150px]">
          <p
            className={`mx-auto w-fit px-3 py-1 text-center rounded-lg text-white text-base md:text-lg ${
              data.Status === "Offer"
                ? "bg-emerald-300 "
                : data.Status === "Rejected"
                ? "bg-orange-300"
                : data.Status === "Interview"
                ? "bg-blue-400 "
                : "bg-gray-300"
            }`}
          >
            {data.Status}
          </p>
        </div>
        <p className="flex-1 min-w-[150px] text-left text-base md:text-lg">
          {data.DateApplied}
        </p>
        <Popover className="relative">
          <PopoverButton className="outline-none group">
            <span className="w-8 h-8 rounded-full hover:bg-gray-100 transition-all duration-200 flex items-center justify-center group-hover:scale-110">
              <MoreHorizontal className="w-4 h-4 text-gray-600 group-hover:text-gray-800" />
            </span>
          </PopoverButton>
          <PopoverPanel
            anchor="bottom end"
            className="w-48 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-50 animate-in fade-in-0 zoom-in-95 duration-200"
          >
            <div className="space-y-1">
              <Link to="/view-details" className="block">
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-blue-50 transition-all duration-200 group">
                  <Eye className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
                    View Details
                  </span>
                </div>
              </Link>

              <Link to="/edit" className="block">
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-green-50 transition-all duration-200 group">
                  <Edit3 className="w-4 h-4 text-green-600 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-green-700">
                    Edit Job
                  </span>
                </div>
              </Link>

              <div className="border-t border-gray-100 my-1"></div>

              <Link to="/delete" className="block">
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 transition-all duration-200 group">
                  <Trash2 className="w-4 h-4 text-red-600 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-red-700">
                    Delete Job
                  </span>
                </div>
              </Link>
            </div>
          </PopoverPanel>
        </Popover>
      </div>
    </div>
  );
}

export default JobItem;
