import { LayoutDashboard } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { databaseService } from "../appwrite/databaseService";
import { Query } from "appwrite";
import {
  addInterviewCount,
  addOfferCount,
  addRejectedCount,
  addTotalAppliedCount,
  addPastWeekData,
} from "../store/JobsSlice";
import { DashboardCard , Piechart , Graph } from "./index";
// import { Select } from "@headlessui/react";
function DashBoard() {
  const inStore = useSelector((state) => state.interviewCount);
  let totalAppliedCount,
    interviewCount,
    offerCount,
    rejectedCount,
    pastWeekData;
  const interviewCountinStore = useSelector((state) => state.interviewCount);
  const totalAppliedCountinStore = useSelector(
    (state) => state.totalAppliedCount
  );
  const rejectedCountinStore = useSelector((state) => state.rejectedCount);
  const offerCountinStore = useSelector((state) => state.offerCount);
  const pastWeekDatainStore = useSelector((state) => state.pastWeekData);
  const dispatch = useDispatch();
  const fetchData = useCallback(async () => {
    try {
      const interviewPromise = databaseService.listDocuments([
        Query.equal("Status", ["Interview"]),
      ]);
      const rejectedPromise = databaseService.listDocuments([
        Query.equal("Status", ["Rejected"]),
      ]);
      const offerPromise = databaseService.listDocuments([
        Query.equal("Status", ["Offer"]),
      ]);
      const totalAppliedPromise = databaseService.listDocuments([
        Query.limit(1000000),
      ]);
      // for previousWeek data
      const endDate = new Date().toISOString();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
      startDate.setHours(0, 0, 0, 0);
      startDate = startDate.toISOString();
      const pastWeekDataPromise = databaseService.listDocuments([
        Query.greaterThanEqual("AppliedDate", startDate),
        Query.lessThanEqual("AppliedDate", endDate),
      ]);
      const [totalApplied, interview, rejected, offer, pastWeekDataDB] =
        await Promise.all([
          totalAppliedPromise,
          interviewPromise,
          rejectedPromise,
          offerPromise,
          pastWeekDataPromise,
        ]);
      totalAppliedCount = totalApplied.length;
      interviewCount = interview.length;
      rejectedCount = rejected.length;
      offerCount = offer.length;
      pastWeekData = pastWeekDataDB;
      dispatch(addOfferCount(offerCount));
      dispatch(addInterviewCount(interviewCount));
      dispatch(addRejectedCount(rejectedCount));
      dispatch(addTotalAppliedCount(totalAppliedCount));
      dispatch(addPastWeekData(pastWeekData));
      // update in store also
    } catch (error) {
      console.log("error", error);
    }
  }, []);
  const pieChartData = useMemo(()=>{
    
  } , [])
  useEffect(() => {
    if (!inStore) {
      fetchData();
    } else {
      // take from store
      interviewCount = interviewCountinStore;
      totalAppliedCount = totalAppliedCountinStore;
      offerCount = offerCountinStore;
      rejectedCount = rejectedCountinStore;
    }
  }, [fetchData]);
  const [showPiechart, setshowPiechart] = useState(true);
  return (
    <div className="w-full bg-white p-4">
      <div className="p-3 text-xl md:text-2xl font-semibold flex rounded-xl bg-indigo-50 items-center">
        <LayoutDashboard className="size-5 mr-2" />
        Dashboard
      </div>
      <div className="w-full p-3 bg-indigo-50 rounded-xl mt-2">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          <DashboardCard label="Total Applied" data={totalAppliedCount} />
          <DashboardCard label="Selected" data={offerCount} />
          <DashboardCard label="Rejected" data={rejectedCount} />
          <DashboardCard label="Interview" data={interviewCount} />
        </div>
      </div>
      {/* for graphs */}
      <div className="w-full p-3 bg-indigo-50 rounded-xl mt-2 flex flex-col md:flex-row">
        <div className="md:flex-[70%] p-2">
          <div className="w-full mb-2">
            <div className="mr-0">
              {/* <Select className="border border-indigo-300 rounded-md px-1 data-focus:bg-blue-100 data-hover:shadow " >
                    <option value="Graph">Graph</option>
                    <option value="Piechart">Piechart</option>
                  </Select> */}
              <select
                className="border border-indigo-300 rounded-md px-1"
                onClick={(e) => {
                  setshowPiechart(e.target.value);
                }}
              >
                <option value="Graph">
                  Graph
                </option>
                <option value="Piechart">Piechart</option>
              </select>
            </div>
          </div>
          {showPiechart ? (
            <Piechart/>
          ): (<Graph/>)}
        </div>
        <div className="md:flex-[30%]">

        </div>
      </div>
    </div>
  );
}

export default DashBoard;
