import { createSlice } from '@reduxjs/toolkit';

const connectionSlice = createSlice({
  name: 'connections',
  initialState: null,
  reducers: {
    addConnections: (state, action) => {
      return action.payload;
    },
    clearConnections: (state) => {
      return null;
    },
  },
});

export const { addConnections, clearConnections } = connectionSlice.actions;
export default connectionSlice.reducer;
