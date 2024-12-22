import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { togglePostLikeAPI , fetchLikesAPI } from "../services/likeAPI";

export const togglePostLike = createAsyncThunk(
  "like/togglePostLike", 
  async (postId, { rejectWithValue }) => {
    try {
      return await togglePostLikeAPI(postId);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const fetchLikes = createAsyncThunk(
  'likes/fetchLikes',
  async (postId, { rejectWithValue }) => {
      try {
        return await fetchLikesAPI(postId);
      } catch (error) {
          console.error("Error fetching likes:", error);
          return rejectWithValue(error.response?.data?.message || "Failed to fetch likes");
      }
  }
);

const initialState = {
  likes:[],
  loading: false,
  error: null,
};

const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    clearLikes: (state) => {
      state.likes = [];
      state.loading = false;
      state.error = null;
  }
  },
  extraReducers: (builder) => {
    builder
      .addCase(togglePostLike.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(togglePostLike.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(togglePostLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred"; 
      })

      // 
      .addCase(fetchLikes.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(fetchLikes.fulfilled, (state, action) => {
        state.loading = false;
        state.likes = action.payload; 
    })
    .addCase(fetchLikes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
    });

      
  },
});


export const { clearLikes } = likeSlice.actions;

export default likeSlice.reducer;



