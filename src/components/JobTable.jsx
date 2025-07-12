import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { ChevronDown, Filter, Plus, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { databaseService } from "../appwrite/databaseService";
import { Query } from "appwrite";
import JobItem from "./JobItem";
function JobTable() {
  const [filter, setFilter] = useState(null);
  const [searchTerm, setsearchTerm] = useState("");
  const [allJobs, setallJobs] = useState([]);
  const [dateFilter, setdateFilter] = useState(null);
  const [statusFilter, setstatusFilter] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      // let queryArr = [];
      const statusQuery =
        statusFilter === null ? [] : [Query.equal("Status", [statusFilter])];
      const dateQuery =
        dateFilter === null
          ? []
          : [
              dateFilter === "Oldest"
                ? Query.orderAsc("AppliedDate")
                : Query.orderDesc("AppliedDate"),
            ];
      setisLoading(true);
      const query =
        searchTerm === "" ? [] : [Query.equal("CompanyName", [searchTerm])];
      setisLoading(true);
      databaseService
        .listDocuments([...query, ...statusQuery, ...dateQuery])
        .then((allJobs) => {
          setallJobs(allJobs);
          setisLoading(false);
        })
        .catch((err) => {
          console.log("error while searching: ", err);
        });
    }, 300);
    return () => {
      clearTimeout(timeout);
    };
  }, [searchTerm, setallJobs, setisLoading]);
  // useEffect(() => {
  //   const statusQuery =
  //     statusFilter === null ? [] : [Query.equal("Status", [statusFilter])];
  //   const dateQuery =
  //     dateFilter === null
  //       ? []
  //       : [
  //           dateFilter === "Oldest"
  //             ? Query.orderAsc("AppliedDate")
  //             : Query.orderDesc("AppliedDate"),
  //         ];
  //         setisLoading(true)
  //   databaseService.listDocuments([...statusQuery, ...dateQuery])
  //   .then((allJobs)=>{
  //     setallJobs(allJobs)
  //     setisLoading(false)
  //   }).catch((err) => {
  //     console.log("error while filter fetching:" , err);

  //   })
  // }, [statusFilter, dateFilter,setisLoading ,setallJobs]);
  
  return (
    <div className="rounded-lg bg-indigo-100">
      <div className="w-full flex flex-col md:flex-row items-center py-3 px-5 md:justify-between space-y-2 md:space-y-0">
        <div className="rounded-lg focus:ring ring-indigo-500 bg-indigo-200 px-2 py-1 flex items-center w-full md:w-1/2">
          <Search className="w-5 h-5 text-indigo-100 hover:text-indigo-400 cursor-pointer mr-2" />
          <input
            className="flex-1 outline-none text-gray-500"
            placeholder="Search"
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setsearchTerm(e.target.value);
            }}
          />
        </div>
        <div className="flex items-center space-x-3">
          <Link
            to="/add-job"
            className="w-full rounded-lg md:w-fit px-3 py-2 bg-indigo-300 hover:bg-indigo-500 text-white flex items-center focus:ring focus:ring-indigo-700"
          >
            <Plus className="w-5 h-5" />
            <p>Add Job</p>
          </Link>
          {/* Modernized Filter Dropdown */}
          <Listbox

          //  both of the above attributes arent required in my case?
          >
            <div className="relative">
              <ListboxButton className="px-3 py-2 bg-white hover:bg-indigo-100 flex items-center transition rounded-lg text-indigo-700 shadow border border-indigo-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none">
                <Filter className="w-4 h-4 text-indigo-500 mr-1.5" />
                <span className="font-medium">Filter</span>
                <ChevronDown className="ml-2 w-4 h-4 text-indigo-400" />
              </ListboxButton>
              <Transition
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-2"
              >
                <ListboxOptions
                  anchor="bottom end"
                  className="z-50 rounded-xl w-48 p-2 bg-white border border-indigo-200 shadow-lg outline-none space-y-1 mt-2"
                >
                  {/* Date Filter Options */}
                  {[
                    { label: "Latest First", value: "Latest" },
                    { label: "Oldest First", value: "Oldest" },
                  ].map((opt) => (
                    <ListboxOption
                      key={opt.value}
                      value={opt.value}
                      as={React.Fragment} // what does this do ? dont add an extra wrapper
                    >
                      {({ active }) => (
                        // what is this active arguement and what does it do?
                        // tells whether it is focused or hovered
                        <div
                          onClick={() =>
                            setdateFilter(
                              dateFilter === opt.value ? null : opt.value
                            )
                          }
                          className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition text-sm font-medium ${
                            dateFilter === opt.value
                              ? "bg-indigo-100 text-indigo-700"
                              : active
                              ? "bg-indigo-50 text-indigo-600"
                              : "text-gray-700"
                          }`}
                        >
                          {opt.label}
                          {dateFilter === opt.value && (
                            <svg
                              className="w-4 h-4 text-indigo-500 ml-2"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                      )}
                    </ListboxOption>
                  ))}
                  <div className="bg-indigo-100 h-px rounded-xl w-[90%] mx-auto my-1"></div>
                  {/* Status Filter Options */}
                  {[
                    { label: "Offer", color: "text-blue-600" },
                    { label: "Interview", color: "text-blue-400" },
                    { label: "Applied", color: "text-blue-400" },
                    { label: "Rejected", color: "text-red-400" },
                  ].map((opt) => (
                    <ListboxOption
                      key={opt.label}
                      value={opt.label}
                      as={React.Fragment}
                    >
                      {({ active }) => (
                        <div
                          onClick={() =>
                            setstatusFilter(
                              statusFilter === opt.label ? null : opt.label
                            )
                          }
                          className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition text-sm font-medium ${
                            statusFilter === opt.label
                              ? "bg-indigo-100 text-indigo-700"
                              : active
                              ? "bg-indigo-50 text-indigo-600"
                              : "text-gray-700"
                          }`}
                        >
                          <span>
                            Status:{" "}
                            <span className={`italic ${opt.color}`}>
                              {opt.label}
                            </span>
                          </span>
                          {statusFilter === opt.label && (
                            <svg
                              className="w-4 h-4 text-indigo-500 ml-2"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                      )}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>
      <div className="w-full mt-2">
        <div className="w-full p-2 border-b  border-b-indigo-200 overflow-x-auto scrollbar-hide bg-indigo-400">
          <div className="w-full overflow-x-auto scrollbar-hide">
            <div className="w-full flex items-center">
              <div className="flex flex-1 items-center">
                <p className="flex-1 min-w-[200px] text-left text-base md:text-lg">
                  Company Name
                </p>
                <p className="flex-1 min-w-[200px] text-left text-base md:text-lg">
                  Role
                </p>
                <div className="flex-1 min-w-[150px]">
                  <p
                    className={`mx-auto w-fit px-3 py-1 text-center rounded-xl text-base font-medium md:text-lg `}
                  >
                    Status
                  </p>
                </div>
                <p className="flex-1 min-w-[150px] text-left text-base md:text-lg">
                  Applied Date
                </p>
              </div>
            </div>
          </div>
        </div>
        {isLoading ? (<div></div>) : (
          allJobs.map((eachJob)=>(
            <JobItem data={eachJob} key={eachJob.CompanyName}></JobItem>
          ))
        )}
        {/* pagination logic */}
      </div>
    </div>
  );
}

export default JobTable;
