import { createSlice } from '@reduxjs/toolkit';
import { changePassApi, getProfileDataApi, profileUpdateApi } from '../Api/api';
// import { registrationLoginApi } from '../Api/api';
import toast from 'react-hot-toast';
import { handleLogout } from './authSlice';

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        isLoading: false,
        isCreated: false,
        isUpdated: false,
        errors: null,
        profileData: null,
    },

    reducers: {
        setLoading: (state) => {
            state.isLoading = true;
            state.isCreated = false;
            state.isUpdated = false;
        },
        handleSuccessData: (state, action) => {
            state.profileData = action.payload;
            state.successMessage = action.payload?.message;
            state.isLoading = false;
        },
        handleErrorData: (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        },
        handleSuccessRegistration: (state, action) => {
            state.isLoading = false;
            state.isCreated = true;
            toast.success(action.payload?.message, {
                style: {
                    marginTop: '4rem'
                }
            });
        },
        handleSuccessChangePassword: (state, action) => {
            state.isLoading = false;
            state.isUpdated = true;
            toast.success(action.payload?.message, {
                style: {
                    marginTop: '4rem'
                }
            });
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
    handleSuccessData,
    handleErrorData,
    handleErrorRegistration,
    handleSuccessRegistration,
    handleSuccessChangePassword
} = profileSlice.actions;
export default profileSlice.reducer;

export const getProfileData = () => async (dispatch, getState) => {
    try {
        dispatch(setLoading());
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                Authorization: getState()?.auth?.token
            }
        };
        const { data } = await getProfileDataApi(config);
        const { statusCode } = data;
        if (statusCode === 200) {
            dispatch(handleSuccessData(data?.data));
        }
    } catch (error) {
        if (error.response && error.response.data.errors) {
            return dispatch(handleErrorData(error.response.data.errors));
        } else {
            if (error.response.data.statusCode === 401) {
                dispatch(handleLogout());
            }
            return dispatch(handleErrorData(error.message));
        }
    }
};
export const profileUpdateRequest = (userData) => async (dispatch, getState) => {
    dispatch(setLoading());
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          Authorization: getState()?.auth?.token,
        },
      };
      const { data } = await profileUpdateApi(userData, config);

      const { statusCode } = data;
      if (statusCode === 200) {
        dispatch(handleSuccessRegistration(data));
      }
    } catch (error) {
      console.log(error, "error");
      if (error.response && error.response.data.statusCode) {
        return dispatch(handleErrorRegistration(error.response.data.message));
      } else if (error.response && error.response.data.errors) {
        return dispatch(handleErrorRegistration(error.response.data.errors));
      } else {
        return dispatch(handleErrorRegistration(error.message));
      }
    }
};
export const changePasswordRequest = (userData) => async (dispatch, getState) => {
    dispatch(setLoading());
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                Authorization: getState()?.auth?.token
            }
        };
        const { data } = await changePassApi(userData, config);

        const { statusCode } = data;
        if (statusCode === 200) {
            dispatch(handleSuccessChangePassword(data));
        }
    } catch (error) {
        console.log(error, 'error');
        if (error.response && error.response.data.statusCode === 401) {
            toast.error(error.response.data?.message, {
                style: {
                    marginTop: '4rem'
                }
            });
            // return dispatch(handleErrorRegistration(error.response.data.errors));
        } else {
            return dispatch(handleErrorRegistration(error.message));
        }
    }
};
