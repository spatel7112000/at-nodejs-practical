import { createSlice } from '@reduxjs/toolkit';
import { adminLoginApi } from '../Api/api';
import toast from 'react-hot-toast';


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoading: false,
        isLoggedIn: false,
        userData: null,
        errors: null,
        token: null,
    },

    reducers: {
        setLoading: (state) => {
            state.isLoading = true;
        },
        handleSuccessLogin: (state, action) => {
            state.isLoading = false;
            state.isLoggedIn = true;
            state.userData = action.payload?.data;
            state.token = action.payload?.data?.access_token;
            toast.success(action.payload?.message, {
                style: {
                    marginTop: '4rem'
                }
            });
        },
        handleErrorLogin: (state, action) => {
            state.isLoading = false;
            state.errors = action.payload;
        },
        handleLogout: (state) => {
            state.isLoading = false;
            state.isLoggedIn = false;
            state.userData = null;
            state.errors = null;
            state.token = null;
        },

    }
});
export const {
    setLoading,
    handleSuccessLogin,
    handleErrorLogin,
    handleLogout
} = authSlice.actions;
export default authSlice.reducer;

export const adminLoginRequest = (userData) => async (dispatch) => {
    dispatch(setLoading());
    try {

        // if (userData?.email === "admin@gmail.com" && userData?.password === "123456C!") {
        //     dispatch(handleSuccessLogin(userData));
        // }
        const { data } = await adminLoginApi(userData);

        const { statusCode } = data;
        if (statusCode === 200) {
            dispatch(handleSuccessLogin(data));
        }
    } catch (error) {
        if (error.response && (error.response.data.statusCode === 401 || error.response.data.statusCode === 404)) {
            toast.error(error.response.data?.message, {
                style: {
                    marginTop: '4rem'
                }
            });
            return dispatch(handleErrorLogin(error.response.data.errors));
        }else if (error.response.data.statusCode === 422) {
            toast.error(error.response.data?.message, {
                style: {
                    marginTop: '4rem'
                }
            });
            dispatch(handleErrorLogin(error.response.data.message));
        } else {
            return dispatch(handleErrorLogin(error.message));
        }
    }
};
