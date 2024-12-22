import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";

import { 
    createProfileAPI,
    createAvatarAPI,
    createCoverAPI,
    updateProfileAPI,
    updateAvatarAPI,
    updateCoverAPI,
    getProfileByIdAPI,

 } from "../services/profileAPI";

 export const createProfile = createAsyncThunk(
    "profiles/createProfile",
    async(postData , {rejectWithValue}) => {
      try {
        return await createProfileAPI(postData)
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const createAvatar = createAsyncThunk(
    "profiles/createAvatar",
    async(avatar , {rejectWithValue}) => {
      try {
        return await createAvatarAPI(avatar)
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const createCover = createAsyncThunk(
    "profiles/createCover",
    async(cover , {rejectWithValue}) => {
      try {
        return await createCoverAPI(cover)
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );



  export const getProfileById = createAsyncThunk(
    "profiles/getProfile",
    async (_id, { rejectWithValue }) => {
        try {
            return await getProfileByIdAPI(_id);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
  );

  export const updateProfile = createAsyncThunk(
    "profiles/updateProfile",
    async ({ _id, updateData }, { rejectWithValue }) => {
        try {
            return await updateProfileAPI(_id, updateData);
            
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
  );

  export const updateAvatar = createAsyncThunk(
    "profiles/updateAvatarImage",
    async ({ _id, updateAvatarImage }, { rejectWithValue }) => {
        try {
            return await updateAvatarAPI(_id, updateAvatarImage);
            
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
  );

  export const updateCover = createAsyncThunk(
    "profiles/updateCoverImage",
    async ({ _id, updateCoverImage }, { rejectWithValue }) => {
        try {
            return await updateCoverAPI(_id, updateCoverImage);
            
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
  );



  const initialState = {
    profiles : [],
    profile : null,
    loading : null,
    error : null,
  };

  const profileSlice = createSlice({
    name : 'profiles',
    initialState,
    reducers : {
      resetError(state){
        state.error = null;
      },
    },

    extraReducers : (builder) => {
      builder

      // create profile
      .addCase(createProfile.pending , (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProfile.fulfilled , (state , action) => {
        state.loading = false;
        state.profile = action.payload; 
      })
      .addCase(createProfile.rejected , (state , action) => {
        state.loading = false;
        state.error = action.payload;
      })

       // create avatar
       .addCase(createAvatar.pending , (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAvatar.fulfilled , (state , action) => {
        state.loading = false;
        state.avatar = action.payload; 
      })
      .addCase(createAvatar.rejected , (state , action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // create cover
      .addCase(createCover.pending , (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCover.fulfilled , (state , action) => {
        state.loading = false;
        state.cover = action.payload; 
      })
      .addCase(createCover.rejected , (state , action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update profile
      .addCase(updateProfile.pending , (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profiles = state.profiles.map((profile) =>
          profile._id === action.payload._id ? action.payload : profile
        );
        if (state.profile && state.profile._id === action.payload._id) {
          state.profile = action.payload;
        }
      })
      .addCase(updateProfile.rejected , (state , action) => {
        state.loading = false;
        state.error = action.payload;
      })


       // update avatar
       .addCase(updateAvatar.pending , (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.avatar = action.payload;
      })
      .addCase(updateAvatar.rejected , (state , action) => {
        state.loading = false;
        state.error = action.payload;
      })

         // update cover
         .addCase(updateCover.pending , (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateCover.fulfilled, (state, action) => {
          state.loading = false;
          state.cover = action.payload;
        })
        .addCase(updateCover.rejected , (state , action) => {
          state.loading = false;
          state.error = action.payload;
        })


      // get profile by id
      .addCase(getProfileById.pending , (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfileById.fulfilled , (state , action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getProfileById.rejected , (state , action) => {
        state.loading = false;
        state.error = action.payload;
      })


    }
  })

 export const {resetError} = profileSlice.actions;
  export default profileSlice.reducer;