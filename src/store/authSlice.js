import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: false,
    user: null,
  },
  reducers: {
    login(state, action) {
      state.status = true;
      state.user = action.payload.userData;
    },
    logout(state) {
      state.status = false;
      state.user = null;
    },
  },
});

export default authSlice.reducer;

export const { login, logout } = authSlice.actions;
