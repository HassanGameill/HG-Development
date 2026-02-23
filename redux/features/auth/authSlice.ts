import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";

interface AuthState {
  token: string;
  user: string | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  token: "",
  user: null,
  isLoading: true, // 🔥 VERY IMPORTANT
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (
      state,
      action: PayloadAction<{ token: string }>
    ) => {
      state.token = action.payload.token;
      state.isLoading = false;
    },

    userLoggedIn: (
      state,
      action: PayloadAction<{ accessToken: string; user: string }>
    ) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
      state.isLoading = false;
    },

    userLoggedOut: (state) => {
      state.token = "";
      state.user = null;
      state.isLoading = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state) => {
      state.isLoading = false; // ✅ hydration finished
    });
  },
});

export const {
  userRegistration,
  userLoggedIn,
  userLoggedOut,
} = authSlice.actions;

export default authSlice.reducer;
