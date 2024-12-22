import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
    signupUserAPI,
    loginUserAPI,
    logoutUserAPI,
    refreshAccessTokenAPI,
    getCurrentUserAPI,
    updatePasswordAPI
 } from "../services/authAPI";

// Fetch current user
export const getCurrentUser = createAsyncThunk(
    "users/getCurrentUser",
    async(_, { rejectWithValue }) => {
        try {
           const userData = await getCurrentUserAPI();
           return userData;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Signup
export const signupUser = createAsyncThunk(
    "users/Signup",
    async(userData, { rejectWithValue }) => {
        try {
            return await signupUserAPI(userData);
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Login
export const loginUser = createAsyncThunk(
    "users/login",
    async(data, { rejectWithValue }) => {
        try {
            return await loginUserAPI(data);
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Update password
export const updatePassword = createAsyncThunk(
    "users/update-password",
    async(data, { rejectWithValue }) => {
        try {
            return await updatePasswordAPI(data);
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Logout
export const logoutUser = createAsyncThunk(
    "users/logout",
    async(_, { rejectWithValue }) => {
        try {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            return; 
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Refresh Access Token
export const refreshAccessToken = createAsyncThunk(
  "users/refresh-token",
  async (_, { rejectWithValue, getState }) => {
      const state = getState();
      
      if (!state.auth.accessToken) {
          return rejectWithValue("No valid access token available");
      }

      try {
          const response = await refreshAccessTokenAPI();
          return response.data;
      } catch (error) {
          return rejectWithValue(error.response?.data || error.message);
      }
  }
);

const initialState = {
    status: false,
    userData: null,
    loading: false,
    error: null,
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Signup
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.status = true;
                state.userData = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                localStorage.setItem("accessToken", action.payload.accessToken);
                localStorage.setItem("refreshToken", action.payload.refreshToken);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Logout
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.status = false;
                state.userData = null;
                state.accessToken = null;
                state.refreshToken = null;
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get current user
            .addCase(getCurrentUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload;
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Refresh access token
            .addCase(refreshAccessToken.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(refreshAccessToken.fulfilled, (state, action) => {
                state.loading = false;
                state.accessToken = action.payload.accessToken;
            })
            .addCase(refreshAccessToken.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default authSlice.reducer;
