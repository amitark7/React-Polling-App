import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserList=createAsyncThunk("userList/getUserList",async (data)=>{
  try {
    const response=await axios.get(`${process.env.REACT_APP_BASE_URL}user/list/${data.page}?limit=${data.limit}`)
    console.log(response);
    return response
  } catch (error) {
    return error.response;
  }
})

const userListSlice=createSlice({
  name:"userList",
  initialState:{userList:[],loading:false},
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase()
  }
})