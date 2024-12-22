import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { 
  createPostAPI , 
  updatePostAPI,
  getAllPostAPI,
  getPostByIdAPI,
  deletePostAPI,
  getPostByFollowedUserAPI,
 } from "../services/postAPI";

export const createPost = createAsyncThunk(
  "posts/createPost",
  async(postData , {rejectWithValue}) => {
    try {
      return await createPostAPI(postData)
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ _id, updateData }, { rejectWithValue }) => {
      try {
          return await updatePostAPI({_id, updateData});
      } catch (error) {
          return rejectWithValue(error.response.data);
      }
  }
);

export const fetchAllPosts = createAsyncThunk(
  'posts/fetchAll',
  async ({ queryParams }, { rejectWithValue }) => {
      try {
          return await getAllPostAPI(queryParams);
      } catch (error) {
          return rejectWithValue(error.response.data);
      }
  }
);

export const getPostByFollowedUser = createAsyncThunk(
  'posts/following-posts',
  async ({ queryParams }, { rejectWithValue }) => {
      try {
          return await getPostByFollowedUserAPI(queryParams);
      } catch (error) {
          return rejectWithValue(error.response.data);
      }
  }
);

export const fetchPostById = createAsyncThunk(
  'posts/fetchPostById',
  async (_id, { rejectWithValue }) => {
      try {
          return await getPostByIdAPI(_id);
      } catch (error) {
          return rejectWithValue(error.response.data);
      }
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async ({_id},{rejectWithValue}) => {
      try {
          return await deletePostAPI(_id);
      } catch (error) {
          return rejectWithValue(error.response.data);
      }
  }
);





const initialState = {
    posts : [],
    followedPosts : [],
    post : null,
    meta : null,
    loading : null,
    error : null,
};

const postSlice = createSlice({
    name : 'posts',
    initialState,
    reducers : {
        resetError(state){
            state.error = null;
        },
    },

    extraReducers : (builder) => {
        builder

          //fetch all post
          .addCase(fetchAllPosts.pending , (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchAllPosts.fulfilled , (state , action) => {
            state.loading = false;
            state.posts = action.payload;
            state.meta = action.payload.meta;
          })
          .addCase(fetchAllPosts.rejected , (state , action) => {
            state.loading = false;
            state.error = action.payload;
          })

           //fetch all post by followed user
           .addCase(getPostByFollowedUser.pending , (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getPostByFollowedUser.fulfilled , (state , action) => {
            state.loading = false;
            state.followedPosts = action.payload;
           // state.meta = action.payload.meta;
          })
          .addCase(getPostByFollowedUser.rejected , (state , action) => {
            state.loading = false;
            state.error = action.payload;
          })

          // fetch post by id
          .addCase(fetchPostById.pending , (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchPostById.fulfilled , (state , action) => {
            state.loading = false;
            state.post = action.payload;
          })
          .addCase(fetchPostById.rejected , (state , action) => {
            state.loading = false;
            state.error = action.payload;
          })

          // create post
          .addCase(createPost.pending , (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(createPost.fulfilled , (state , action) => {
            state.loading = false;
            state.posts.unshift(action.payload); 
          })
          .addCase(createPost.rejected , (state , action) => {
            state.loading = false;
            state.error = action.payload;
          })

          // update post
          .addCase(updatePost.pending , (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(updatePost.fulfilled , (state , action) => {
            state.loading = false;
            state.posts = state.posts.map((post) => 
               post._id === action.payload._id ? action.payload : post);
          })
          .addCase(updatePost.rejected , (state , action) => {
            state.loading = false;
            state.error = action.payload;
          })

          // delete post
          .addCase(deletePost.pending , (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(deletePost.fulfilled , (state , action) => {
            state.loading = false;
            state.posts = state.posts.filter((post) => 
                post._id !== action.meta.arg);
          })
          .addCase(deletePost.rejected , (state , action) => {
            state.loading = false;
            state.error = action.payload;
          })
    }
})

export const {resetError} = postSlice.actions;
export default postSlice.reducer;