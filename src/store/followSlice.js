import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { toggleFollowAPI ,
         getFollowedPagesAPI , 
         getUserPageFollowerAPI 
} from "../services/followAPI";

export const toggelFollow = createAsyncThunk(
    "toggelFollow",
    async(pageId , {rejectWithValue}) => {
      try {
        return await toggleFollowAPI(pageId);
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
);

export const getFollowedPages = createAsyncThunk(
    " getFollowedPages",
    async(followerId , {rejectWithValue}) => {
      try {
        return await getFollowedPagesAPI(followerId);
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
);

export const getUserPageFollower = createAsyncThunk(
    "getUserPageFollower",
    async(pageId , {rejectWithValue}) => {
      try {
        return await getUserPageFollowerAPI(pageId);
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
);


const initialState = {
    loading : false,
    followed : null,
    pageFollowers : [],
    myFollowings : [],
}


const followSlice = createSlice({
    name : "follows",
    initialState,
    reducers:{
      clearpageFollowers: (state) => {
        state.follows = [];
        state.loading = false;
        state.error = null;
      },
      clearmyFollowings: (state) => {
        state.follows = [];
        state.loading = false;
        state.error = null;
      }

    },
    extraReducers : (builder) => {
        builder.addCase(toggelFollow.pending,(state) => {
            state.loading = true;
        })
        builder.addCase(toggelFollow.fulfilled, (state, action) => {
            state.loading = false;
            state.followed = action.payload;
        });
        builder.addCase(getUserPageFollower.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            getUserPageFollower.fulfilled,
            (state, action) => {
                state.loading = false;
                state.pageFollowers = action.payload;
            }
        );
        builder.addCase(getFollowedPages.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getFollowedPages.fulfilled, (state, action) => {
            state.loading = false;
            state.myFollowings = action.payload;
        });
    },
});

export const { clearpageFollowers , myFollowings} = followSlice.actions;

export default followSlice.reducer;