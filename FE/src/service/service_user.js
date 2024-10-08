import axios from "axios";
import { Service_Base } from "./service_base";
import { CONST_URL } from "../constants";

export class Service_User {
    // HTTP get list user
    static GetUser = async (token) => {
        const endpoint = '/users/getUsers';
        try {
            const data = await Service_Base.MethodGet(endpoint, token);
            return data;
        } catch (error) {
            throw error;
        }
    };

    // HTTP register user
    static RegisterUser = async (token, value) => {
        const endpoint = '/users/registerUser';
        try {
            const data = await Service_Base.MethodPost(endpoint, token, value);
            return data;
        } catch (error) {
            throw error;
        }
    }

    // HTTP edit user
    static UpdateUser = async (token, id, newValue) => {
        const endpoint = '/users/editUser';
        try {
            const data = await Service_Base.MethodPut(endpoint, token, id, newValue);
            return data;
        } catch (error) {
            throw error;
        }
    }

    // HTTP edit password user
    static UpdatePasswordUser = async (token, id, newValue) => {
        const endpoint = '/users/editPasswordUser';
        try {
            const data = await Service_Base.MethodPut(endpoint, token, id, newValue);
            return data;
        } catch (error) {
            throw error;
        }
    }

    // HTTP delele user
    static DeleteUser = async (token, id) => {
        const endpoint = '/users/deleteUser';
        try {
            const data = await Service_Base.MethodDelete(endpoint, token, id);
            return data;
        } catch (error) {
            throw error;
        }
    }

    // HTTP delete multiple users
    static DeleteMultipleUser = async (token, ids) => {
        const endpoint = '/users/deleteMultipleUsers';
        try {
            const data = await Service_Base.MethodPost(endpoint, token, ids);
            return data;
        } catch (error) {
            throw error;
        }
    }

    // HTTP login user
    static UserLogin = async (data) => {
        const endpoint = '/users/login';
        try {
            const url = CONST_URL + endpoint;
            const response = await axios.post(url, data);
            if (response.status === 200)
                return response.data;
        } catch (error) {
            if (error.request.status === 400) {
                throw error.response.data;
            }
            throw error.message;
        }
    }

    // HTTP forget password user
    static ForgetPasswordUser = async (data) => {
        const endpoint = '/users/forgetPasswordUser';
        try {
            const url = CONST_URL + endpoint;
            const response = await axios.post(url, data);
            if (response.status === 200)
                return response.data;
        } catch (error) {
            if (error.request.status === 400) {
                throw error.response.data;
            }
            throw error.message;
        }
    }

    // HTTP check token expired
    static CheckTokenExpired = async (data) => {
        const endpoint = '/users/checkTokenExpired';
        try {
            const url = CONST_URL + endpoint;
            const response = await axios.post(url, data);
            if (response.status === 200)
                return response.data;
        } catch (error) {
            if (error.request.status === 400) {
                throw error.response.data;
            }
            throw error.message;
        }
    }

    // HTTP check status reset password of user 
    static CheckStatusResetPasswordOfUser = async (data) => {
        const endpoint = '/users/checkStatusResetPasswordOfUser';
        try {
            const url = CONST_URL + endpoint;
            const response = await axios.post(url, data);
            if (response.status === 200)
                return response.data;
        } catch (error) {
            if (error.request.status === 400) {
                throw error.response.data;
            }
            throw error.message;
        }
    }

    // HTTP reset password user 
    static ResetPasswordUser = async (data) => {
        const endpoint = '/users/resetPasswordUser';
        try {
            const url = CONST_URL + endpoint;
            const response = await axios.post(url, data);
            if (response.status === 200)
                return response.data;
        } catch (error) {
            if (error.request.status === 400) {
                throw error.response.data;
            }
            throw error.message;
        }
    }

    // HTTP get user info 
    static GetUserInfo = async (data) => {
        const endpoint = '/users/getUserInfo';
        try {
            const url = CONST_URL + endpoint;
            const response = await axios.post(url, data);
            if (response.status === 200)
                return response.data;
        } catch (error) {
            if (error.request.status === 400) {
                throw error.response.data;
            }
            throw error.message;
        }
    }
}