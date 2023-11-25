import axios from "axios";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiURL } from "../../api/apiUrl";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const login = createAsyncThunk(
  "api/user/login",
  async (_, thunkApi) => {
    try {
      const userID = sessionStorage.getItem("userID")
      const { data } = await axios.get(`${apiURL}/api/users/get-user/${userID}`, {withCredentials: true});
      const { userDB } = data;

      if (userDB) {
        return userDB;
      }
    } catch (error:any) {
        console.error(error);
      return thunkApi.rejectWithValue({
        error: error.message,
        message: error.message,
      });
    }
  }
);

// export const loginApi = createApi({
//   reducerPath: 'loginApi',
//   baseQuery: fetchBaseQuery({ baseUrl: `${apiURL}` }),
//   endpoints: (builder) => ({
//     getUserByCookie: builder.query({
//       query: (user) => () => 'user',
//     }),
//   }),
// })