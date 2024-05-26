import { createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../axios';

export const fetchRemovePost = createAsyncThunk("/posts/fetchRemovePost", async (id) => 
 axios.delete(`/posts/${id}`)
)

const initialState ={
    posts:[],
    status:"loading"
}

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState ,
  reducers : {
  },
  
  
  
})
export const authReducer = authSlice.reducer;
export const selectIsAuth = (state) => Boolean(state.auth.data);
export const { logout } = authSlice.actions;