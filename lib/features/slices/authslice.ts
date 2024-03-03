import { User } from "@/types/user.type";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
    user: User | null
}

const initialState: IAuthState = {
    user: null,
  };
  
  export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setAuthState: (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      },
    },
  });
  
  export const { setAuthState } = authSlice.actions;
  export const authReducer = authSlice.reducer;