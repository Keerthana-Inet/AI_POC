import axios, { AxiosError } from "axios";
import { loginRequest, loginSuccess, loginFailure } from "./LoginSlice";
import { AppDispatch } from "./ProgressStore";
import FormData from "form-data";
import { resumeFailure, resumeRequest, resumeSuccess } from "./ResumeSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNBlobUtil from 'react-native-blob-util';

interface LoginCredentials {
    username: string;
    password: string;
}

const isAxiosError = (error: unknown): error is AxiosError => {
    return (error as AxiosError).isAxiosError !== undefined;
};

export const login = (credentials: LoginCredentials) => async (dispatch: AppDispatch) => {
    dispatch(loginRequest());
    try {
        const payload = {
            username: credentials.username,
            password: credentials.password
        };
        const response = await axios.post(
            'https://cd8e-49-206-118-179.ngrok-free.app/token',
            payload,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        // Extract token from the API response
        const token = response.data.access_token;
        if (token) {
            dispatch(loginSuccess(token));
        } else {
            dispatch(loginFailure("Token not received"));
        }
    } catch (error) {
        if (isAxiosError(error)) {
            const err = error as AxiosError<{ error: string }>;
            dispatch(loginFailure(err.response?.data?.error || err.message));
        } else {
            dispatch(loginFailure("An unexpected error occurred"));
        }
    }
};

const getToken = async () => {
    try {
        const savedToken = await AsyncStorage.getItem('userToken');
        return savedToken;
    } catch (error) {
        console.error("Error Retrieving", error);
        return null;
    }
}
const resolveContentUriToFilePath = async (uri: string): Promise<string> => {
    if (uri.startsWith('content://')) {
        try {
            const statResult = await RNBlobUtil.fs.stat(uri);
            console.log('Stat result:', statResult);
            return statResult.path; // Ensure this resolves to a valid path
        } catch (error) {
            console.error('Error resolving content URI:', error);
            throw new Error('Unable to resolve content URI to a file path.');
        }
    }
    return uri; // Return directly if it's already a file path
};


export const resumeEvaluate = (
    job: string,
    file: { uri: string; name: string; type: string }
) => async (dispatch: AppDispatch) => {
    const token = await getToken(); // Retrieve token from storage
    console.log("Token in resumeEvaluate:", token);
    dispatch(resumeRequest());
    
    if (token) {
        // Check if the file object has the expected properties
        // if (!file || !file.uri || !file.name) {
        //     console.error("Invalid file object:", file);
        //     dispatch(resumeFailure("Invalid file object"));
        //     return;
        // }

        try {
            const filePath = await resolveContentUriToFilePath(file.uri);
            const formData = new FormData();
            formData.append('job', job);
            formData.append('file', {
                uri: filePath,
                name: file.name,
                type: file.type || 'application/octet-stream',
            });

            // Manually log the data being sent
            console.log('Job:', job);
            console.log('File URI:', filePath);
            console.log('File Name:', file.name);
            console.log('File Type:', file.type || 'application/octet-stream');

            // Making the API request
            const response = await axios.post(
                'https://cd8e-49-206-118-179.ngrok-free.app/evaluate',
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        // 'Content-Type': 'multipart/form-data' is automatically set by axios
                    },
                }
            );

            console.log('API response:', response);
            dispatch(resumeSuccess(response.data)); // Dispatch success with the data received
        } catch (error) {
            console.error("Error during API request:", error);
            if (axios.isAxiosError(error)) {
                const err = error as AxiosError<{ error: string }>;
                dispatch(resumeFailure(err.response?.data?.error || err.message));
            } else {
                dispatch(resumeFailure('An unexpected error occurred'));
            }
        }
    } else {
        throw new Error("Authorization token is missing");
    }
};
