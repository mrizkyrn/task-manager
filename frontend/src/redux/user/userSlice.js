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
      signoutStart(state) {
         state.loading = true;
         state.error = null;
      },
      signoutSuccess(state) {
         state.loading = false;
         state.currentUser = null;
      },
      signoutFailure(state, action) {
         state.loading = false;
         state.error = action.payload;
      },
      editUserStart(state) {
         state.loading = true;
         state.error = null;
      },
      editUserSuccess(state, action) {
         state.loading = false;
         state.currentUser.username = action.payload.username;
         state.currentUser.avatar = action.payload.avatar;
      },
      editUserFailure(state, action) {
         state.loading = false;
         state.error = action.payload;
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
   signoutStart,
   signoutSuccess,
   signoutFailure,
   editUserStart,
   editUserSuccess,
   editUserFailure,
} = userSlice.actions;

export default userSlice.reducer;