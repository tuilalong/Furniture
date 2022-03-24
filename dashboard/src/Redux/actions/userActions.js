// import {
//   USER_LOGIN_FAIL,
//   USER_LOGIN_REQUEST,
//   USER_LOGIN_SUCCESS,
//   USER_LOGOUT_SUCCESS,
//   USER_REGISTER_REQUEST,
//   USER_REGISTER_SUCCESS,
//   USER_REGISTER_FAIL,
//   USER_DETAILS_PROFILE_REQUEST,
//   USER_DETAILS_PROFILE_SUCCESS,
//   USER_DETAILS_PROFILE_FAIL,
//   USER_DETAILS_PROFILE_RESET,
//   USER_UPDATE_PROFILE_REQUEST,
//   USER_UPDATE_PROFILE_SUCCESS,
//   USER_UPDATE_PROFILE_FAIL,
// } from "../constants/UserConstants";

// import axios from "axios";

// export const login = (email, password) => async (dispatch) => {
//   try {
//     dispatch({ type: USER_LOGIN_REQUEST });

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     const { data } = await axios.post(
//       `/users/login`,
//       { email, password },
//       config
//     );

//     dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

//     localStorage.setItem("userInfo", JSON.stringify(data));
//   } catch (error) {
//     dispatch({
//       type: USER_LOGIN_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

// export const logout = () => async (dispatch) => {
//   localStorage.removeItem("userInfo");
//   dispatch({ type: USER_LOGOUT_SUCCESS });
//   dispatch({ type: USER_DETAILS_PROFILE_RESET });
//   document.location.href = "/login";
// };

// export const register = (name, email, password, phone) => async (dispatch) => {
//   try {
//     dispatch({ type: USER_REGISTER_REQUEST });

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     const { data } = await axios.post(
//       `/users/register`,
//       { name, email, password, phone },
//       config
//     );

//     dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
//     dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

//     localStorage.setItem("userInfo", JSON.stringify(data));
//   } catch (error) {
//     dispatch({
//       type: USER_REGISTER_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

// export const getUserDetailsProfile = (id) => async (dispatch, getState) => {
//   try {
//     dispatch({ type: USER_DETAILS_PROFILE_REQUEST });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };
//     const { data } = await axios.get(`/users/${id}`, config);

//     dispatch({ type: USER_DETAILS_PROFILE_SUCCESS, payload: data });
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     if (message === "not auth, token fail!") {
//       dispatch(logout());
//     }
//     dispatch({
//       type: USER_DETAILS_PROFILE_FAIL,
//       payload: message,
//     });
//   }
// };

// export const updateProfile = (user) => async (dispatch, getState) => {
//   try {
//     dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };
//     const { data } = await axios.put(`/users/profile`, user, config);

//     dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });

//     localStorage.setItem("userInfo", JSON.stringify(data));
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     if (message === "not auth, token fail!") {
//       dispatch(logout());
//     }
//     dispatch({
//       type: USER_UPDATE_PROFILE_FAIL,
//       payload: message,
//     });
//   }
// };

import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
} from "../constants/UserConstants";

import axios from "axios";
import { toast } from "react-toastify";

export const login = (email, password) => async (dispatch) => {
  const toastObj = {
    pauseOnfocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/users/login`,
      { email, password },
      config
    );

    if (!data.isAdmin === true) {
      toast.error("You are not Admin", toastObj);
      dispatch({
        type: USER_LOGIN_FAIL,
      });
    } else {
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    }
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT_SUCCESS });
  // dispatch({ type: USER_DETAILS_PROFILE_RESET });
  document.location.href = "/login";
};