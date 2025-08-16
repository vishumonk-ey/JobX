import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  allJobs: null,
  interviewCount: null,
  totalAppliedCount: null,
  rejectedCount: null,
  offerCount: null,
  pastWeekData : null
};
const jobslice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    addJobs: (state, action) => {
      state.allJobs = action.payload;
      state.totalAppliedCount = action.payload.total
    },
    addOfferCount: (state, action) => {
      state.offerCount = action.payload;
    },
    addRejectedCount: (state, action) => {
      state.rejectedCount = action.payload;
    },
    addTotalAppliedCount: (state, action) => {
      state.totalAppliedCount = action.payload;
    },
    addInterviewCount: (state, action) => {
      state.interviewCount = action.payload;
    },
    addPastWeekData : (state , action) => {
      state.pastWeekData = action.payload
    }
  },
});
export default jobslice.reducer;
export const {
  addJobs,
  addOfferCount,
  addInterviewCount,
  addRejectedCount,
  addTotalAppliedCount,
  addPastWeekData
} = jobslice.actions;
