import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   currentUser: null,
   loading: false,
   error: null,
};

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      signupStart(state) {
         state.loading = true;
         state.error = null;
      },
      signupSuccess(state) {
         state.loading = false;
      },
      signupFailure(state, action) {
         state.loading = false;
         state.error = action.payload;
      },
      signinStart(state) {
         state.loading = true;
         state.error = null;
      },
      signinSuccess(state, action) {
         state.loading = false;
         state.currentUser = action.payload;
      },
      signinFailure(state, action) {
         state.loading = false;
         state.error = action.payload;
      },
      signout(state) {
         state.currentUser = null;
      },
   },
});

export const {
   signupStart,
   signupSuccess,
   signupFailure,
   signinStart,
   signinSuccess,
   signinFailure,
   signout,
} = userSlice.actions;

export default userSlice.reducer;