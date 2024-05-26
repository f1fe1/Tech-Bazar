import { createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../axios';

export const fetchUserData = createAsyncThunk("auth/fetchUserData", async (params) => {
 const { data } = await axios.post("/auth/login", params);
 return data;
})

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
    const { data } = await axios.get("/auth/me");
    return data;
   })

const initialState ={
    data:null,
    status:"loading"
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState ,
  reducers : {
     logout: (state) => {
        state.data = null;
        state.status = "loaded";

     }
  },
  
  extraReducers: {
    [fetchUserData.pending]: (state) => {
        state.status = "loading";
        state.data = null;
    },
    [fetchUserData.fulfilled]: (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
    },
    [fetchUserData.error]: (state, action) => {
        state.status = "error";
        state.data = null;
    },
    [fetchAuthMe.pending]: (state) => {
        state.status = "loading";
        state.data = null;
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
    },
    [fetchAuthMe.error]: (state, action) => {
        state.status = "error";
        state.data = null;
    },
  } ,
  
})
export const authReducer = authSlice.reducer;
export const selectIsAuth = (state) => Boolean(state.auth.data);
export const { logout } = authSlice.actions;