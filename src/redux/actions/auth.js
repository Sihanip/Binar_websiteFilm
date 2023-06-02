import axios from "axios";
import { setIsLoggedIn, setToken } from "../reducer/auth";
import { toast } from "react-toastify";
import { SetUser } from "../reducer/auth";

export const login = (data, navigate) => async (dispatch) => {
    try {
        const response = await axios.post(
        `${process.env.REACT_APP_AUTH_API}/api/v1/auth/login`,
        data,
        { "Content-Type": "application/json" }
    );

    const { token } = response?.data?.data;
    dispatch(setToken(token));
    dispatch(setIsLoggedIn(true));

    //redirect to home, using UseNavigate in component Home
    navigate("/");
    } catch (error) {
        if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message);
            return;
        }
        toast.error(error.message);
    }
};

export const googleLogin = (data, navigate) => async (dispatch) => {
    try {
        const response = await axios.post(
        `${process.env.REACT_APP_AUTH_API}/api/v1/auth/google`,
        data,
        { "Content-Type": "application/json" }
    );

    const { token } = response?.data?.data;
    dispatch(setToken(token));
    dispatch(setIsLoggedIn(true));

  //redirect to home, using UseNavigate in component Home
    navigate("/");
    } catch (error) {
        if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message);
            return;
        }
        toast.error(error.message);
    }
};

export const register = (data, navigate) => async (dispatch) => {
    try {
        const response = await axios.post(
        `${process.env.REACT_APP_AUTH_API}/api/v1/auth/register`,
        data,
        { "Content-Type": "application/json" }
    );

    const { token } = response?.data?.data;

    dispatch(setToken(token));
    dispatch(setIsLoggedIn(true));

    // redirect to home, don't forget to useNavigate in the component
    navigate("/");
    } catch (error) {
        if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
        return;
        }

        toast.error(error.message);
    }
};

export const logout = (navigate) => async (dispatch) => {
    dispatch(setToken(null))
    dispatch(setIsLoggedIn(false))
    dispatch(SetUser(null))

    //redirect to home
    if (navigate) navigate("/")
}

export const getProfile = () => async (dispatch, getState) => {
    try {
        const { token } = getState().auth;
    
        const response = await axios.get(
            `${process.env.REACT_APP_AUTH_API}/api/v1/auth/me`,
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        );
        
    const { data } = response?.data;
        dispatch(SetUser(data));
    } catch (error) {
        if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message);
        if (error.response.status === 401) {
            dispatch(logout())
        }
        return;
    }
    toast.error(error.message);
    }
};