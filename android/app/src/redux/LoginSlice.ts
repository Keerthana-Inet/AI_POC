import { createSlice,PayloadAction } from "@reduxjs/toolkit";
interface LoginState{
    loading:boolean;
    access_token:string | null;
    token_type:string | null;
    error:string | null;
}
const initialState:LoginState={
loading: false,
access_token:null,
token_type:null,
error:null,
};
const loginSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        loginRequest:(state)=>{
            state.loading=true;
            state.error=null;
            
        },
        loginSuccess:(state,action:PayloadAction<string>)=>{
            state.loading=false;
            state.access_token=action.payload;
            state.token_type=action.payload;
            state.error=null;
        },
        loginFailure:(state,action:PayloadAction<string>)=>{
            state.loading=false;
            state.error=action.payload;
        },
    },
});
export const {loginRequest,loginSuccess,loginFailure}=loginSlice.actions;
export default loginSlice.reducer;