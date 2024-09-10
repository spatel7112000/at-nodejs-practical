import { createSlice } from '@reduxjs/toolkit';
import { registrationLoginApi } from '../Api/api';
import toast from 'react-hot-toast';

export const registrationSlice = createSlice({
    name: 'registration',
    initialState: {
        isLoading: false,
        isCreated: false,
        errors: null,
        token: null,
    },

    reducers: {
        setLoading: (state) => {
            state.isLoading = true;
            state.isCreated = false;
        },
        handleSuccessRegistration: (state, action) => {
            state.isLoading = false;
            state.isCreated = true;
            toast.success(action.payload?.message, {
                style: {
                    marginTop: '4rem'
                }
            });
            // state.token = action.payload?.data?.token;
        },
        handleErrorRegistration: (state, action) => {
            let check = typeof action.payload === "object";
            check ? Object.values(action.payload).map((a) =>
                toast.error(a, {
                    style: {
                        marginTop: '2rem'
                    }
                })
            ) : toast.error(action.payload, {
                style: {
                    marginTop: '2rem'
                }
            });

            state.isLoading = false;
            state.errors = action.payload;
        },
    }
});
export const {
    setLoading,
    handleSuccessRegistration,
    handleErrorRegistration
} = registrationSlice.actions;
export default registrationSlice.reducer;

export const adminRegisterRequest = (userData) => async (dispatch) => {
    dispatch(setLoading());
    try {
        const { data } = await registrationLoginApi(userData);

        const { statusCode } = data;
        if (statusCode === 201) {
            dispatch(handleSuccessRegistration(data));
        }
        if (statusCode === 200) {
            dispatch(handleSuccessRegistration(data));
        }
        

    } catch (error) {
        if (error.response && error.response.data.errors) {
            return dispatch(handleErrorRegistration(error.response.data.errors));
        } else if (error.response.data.statusCode === 422) {
            dispatch(handleErrorRegistration(error.response.data.message));
        }else {
            return dispatch(handleErrorRegistration(error.message));
        }
    }
};
