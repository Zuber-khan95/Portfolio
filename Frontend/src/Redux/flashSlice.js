import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  success: '',
  error: '',
};

const flashMessagesSlice = createSlice({
  name: 'flashMessages',
  initialState,
  reducers: {
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setSuccess, setError} = flashMessagesSlice.actions;
export default flashMessagesSlice.reducer;