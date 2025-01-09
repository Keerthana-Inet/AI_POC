import { createSlice,PayloadAction } from "@reduxjs/toolkit";
interface ResumeState{
    loading:boolean;
    access_token:string | null;
    token_type:string | null;
    error:string | null;
}
interface ResumeResponse {
    matching_percentage: number;
    matching_skills: string[];
    gap_skills: string[];
    recommendations: Record<string, string>; // Object with keys as strings and values as strings
}
interface ResumeState {
    loading: boolean;
    access_token: string | null;
    token_type: string | null;
    error: string | null;
    matching_percentage?: number;
    matching_skills?: string[];
    gap_skills?: string[];
    recommendations?: Record<string, string>;
}
const initialState:ResumeState={
loading: false,
access_token:null,
token_type:null,
error:null,
};
const resumeSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        resumeRequest:(state)=>{
            state.loading=true;
            state.error=null;
            
        },
        resumeSuccess:(state,action:PayloadAction<ResumeResponse>)=>{
            state.loading = false;
            state.error = null;
            state.matching_percentage = action.payload.matching_percentage;
            state.matching_skills = action.payload.matching_skills;
            state.gap_skills = action.payload.gap_skills;
            state.recommendations = action.payload.recommendations;
        },
        resumeFailure:(state,action:PayloadAction<string>)=>{
            state.loading=false;
            state.error=action.payload;
        },
    },
});
export const {resumeRequest,resumeSuccess,resumeFailure}=resumeSlice.actions;
export default resumeSlice.reducer;