/* eslint-disable no-unused-vars */
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import auth from "../../firebase/firebase.config";

const initialState = {
  email: "",
  displayName: "",
  photoURL: "",
  phoneNumber: "",
  role: "",
  isLoading: true,
  isError: false,
  error: "",
};

export const createUser = createAsyncThunk(
  "auth/createUser",
  async (
    { email, password, displayName, photoURL, phoneNumber },
    { dispatch }
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName,
        photoURL,
      });

      return userCredential.user;
    } catch (error) {
      console.error("User registration error:", error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return data?.user?.email;
  }
);

export const googleLogin = createAsyncThunk("auth/googleLogin", async () => {
  const provider = new GoogleAuthProvider();
  const data = await signInWithPopup(auth, provider);
  return data?.user?.email;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.email = "";
      state.displayName = "";
      state.photoURL = "";
    },
    setUser: (state, action) => {
      state.email = action?.payload?.email;
      state.displayName = action?.payload?.displayName;
      state.photoURL = action?.payload?.photoURL;
      state.phoneNumber = action?.payload?.phoneNumber;
      state.isLoading = false;
    },
    toggleLoading: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.email = action.payload.email;
        state.displayName = action.payload.displayName;
        state.isError = false;
        state.error = "";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.email = "";
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.email = action.payload;
        state.isError = false;
        state.error = "";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.email = "";
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(googleLogin.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.email = action.payload;
        state.isError = false;
        state.error = "";
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.email = "";
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export const { logout, setUser, toggleLoading } = authSlice.actions;

export default authSlice.reducer;
