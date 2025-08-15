import React from "react";
import {
  EllipsisVertical,
  Edit3,
  Trash2,
  Eye,
  MoreHorizontal,
  Link2Icon,
  Link2,
  LinkIcon,
  Building2,
  Calendar,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Link } from "react-router-dom";

// Sample data for testing
// const data = {
//   CompanyName: "TechCorp Solutions",
//   Role: "Senior Frontend Developer",
//   Status: "Interview",
//   DateApplied: "2024-01-15",
//   notes: "Applied through LinkedIn and got a positive response! 🎉",
//   Link: "https://techcorp.com/careers",
//   appliedBy: "LinkedIn",
// };

// More sample data objects for different scenarios
// const sampleJobDataArray = [
//   {
//     CompanyName: "TechCorp Solutions",
//     Role: "Senior Frontend Developer",
//     Status: "Interview",
//     DateApplied: "2024-01-15",
//   },
//   {
//     CompanyName: "InnovateSoft Inc",
//     Role: "Full Stack Engineer",
//     Status: "Offer",
//     DateApplied: "2024-01-10",
//   },
//   {
//     CompanyName: "DataFlow Systems",
//     Role: "React Developer",
//     Status: "Rejected",
//     DateApplied: "2024-01-08",
//   },
//   {
//     CompanyName: "CloudTech Solutions",
//     Role: "UI/UX Designer",
//     Status: "Applied",
//     DateApplied: "2024-01-12",
//   },
// ];

function JobItem({ data }) {
  console.log(data);
  
  return (
    <div className="w-full p-2 border-b min-w-[732px] border-b-indigo-200">
      <div className="w-full scrollbar-hide text-gray-700">
        <Disclosure>
          <DisclosureButton className="w-full flex items-center">
            <div className="flex flex-1 items-center">
              <p className="flex-1 min-w-[200px] text-left text-base md:text-lg">
                {data.CompanyName}
              </p>
              <p className="flex-1 min-w-[200px] text-left text-base md:text-lg">
                {data.Role}
              </p>
              <div className="flex-1 min-w-[150px]">
                <p
                  className={`mx-auto w-fit px-3 py-1 text-center rounded-xl text-base md:text-lg ${
                    data.Status === "Offer"
                      ? "bg-emerald-100 text-emerald-700 "
                      : data.Status === "Rejected"
                      ? "bg-orange-100 text-orange-700"
                      : data.Status === "Interview"
                      ? "bg-blue-100 text-blue-700 "
                      : "bg-gray-300"
                  }`}
                >
                  {data.Status}
                </p>
              </div>
              <p className="flex-1 min-w-[150px] text-left text-base md:text-lg">
                {data.DateApplied}
              </p>
            </div>
            <Popover className="relative">
              <PopoverButton className="outline-none group">
                <span className="w-8 h-8 rounded-full hover:bg-gray-100 transition-all duration-200 flex items-center justify-center group-hover:scale-110">
                  <MoreHorizontal className="w-4 h-4 text-gray-600 group-hover:text-gray-800" />
                </span>
              </PopoverButton>
              <Transition
                enterFrom="translate-x-full opacity-0"
                enterTo="transition translate-x-0 opacity-100 duration-300"
                leaveFrom="translate-x-0 opacity-100"
                leaveTo="translate-x-full opacity-0 transition duration-300"
              >
                <PopoverPanel
                  anchor="bottom end"
                  className="w-48 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-50 animate-slide-from-right duration-200"
                >
                  <div className="space-y-1">
                    <Link to={`/view-page/${data.$id}`} className="block">
                      <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-blue-50 transition-all duration-200 group">
                        <Eye className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
                          View Details
                        </span>
                      </div>
                    </Link>

                    <Link to={`/edit-page/${data.$id}`} className="block">
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
              </Transition>
            </Popover>
          </DisclosureButton>
          <DisclosurePanel className="transition-all duration-300 ease-in-out">
            <div className="p-6 mt-2 bg-gradient-to-r from-gray-50 to-indigo-50/30 rounded-xl">
              <div className="space-y-4">
                {/* Notes Section */}
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare className="w-4 h-4 text-indigo-600" />
                    <h4 className="font-medium text-gray-900">Notes</h4>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {data.Notes || "No notes added yet."}
                  </p>
                </div>

                {/* Link Section */}
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition">
                  <div className="flex items-center gap-2 mb-3">
                    <ExternalLink className="w-4 h-4 text-blue-600" />
                    <h4 className="font-medium text-gray-900">
                      Application Link
                    </h4>
                  </div>
                  <a
                    href={
                      RegExp("^https?://").test(data.Link)
                        ? data.Link
                        : `https://${data.Link}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                  >
                    {data.Link || "No link provided"}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Applied Through Section */}
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition">
                  <div className="flex items-center gap-2 mb-3">
                    <LinkIcon className="w-4 h-4 text-green-600" />
                    <h4 className="font-medium text-gray-900">
                      Applied Through
                    </h4>
                  </div>
                  <div className="w-fit px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    {data.AppliedBy || "Not specified"}
                  </div>
                </div>
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>
      </div>
    </div>
  );
}

export default JobItem;
