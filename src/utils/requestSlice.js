import { createSlice } from '@reduxjs/toolkit';

const requestSlice = createSlice({
  name: 'requests',
  initialState: [],
  reducers: {
    addRequests: (state, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {
      const targetId = String(action.payload);
      return state.filter((r) => String(r._id) !== targetId);
    },
  },
});

export const { addRequests, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
