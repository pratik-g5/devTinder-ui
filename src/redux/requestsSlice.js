import { createSlice } from '@reduxjs/toolkit';

const requestsSlice = createSlice({
  name: 'requests',
  initialState: null,
  reducers: {
    addRequests: (state, action) => {
      return action.payload;
    },
    clearRequests: (state, action) => {
      return null;
    },
    clearRequest: (state, action) => {
      return state.filter((request) => request._id !== action.payload);
    },
  },
});

export const { addRequests, clearRequests, clearRequest } =
  requestsSlice.actions;

export default requestsSlice.reducer;
