import axios from 'axios';
import { CONST_URL } from '../constants';

export class Service_Base {
    // HTTP method get
    static MethodGet = async (endpoint, token) => {
        const url = CONST_URL + endpoint;
        try {
            const response = await axios.get(url,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            if (error.request.status === 400) {
                throw error.response.data;
            }
            throw error.message;
        }
    };

    // HTTP method post
    static MethodPost = async (endpoint, token, data) => {
        const url = CONST_URL + endpoint;
        try {
            const response = await axios.post(url, data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            if (error.request.status === 400) {
                throw error.response.data;
            }
            throw error.message;
        }
    };

    // HTTP method put
    static MethodPut = async (endpoint, token, id, newData) => {
        const url = CONST_URL + endpoint + `/${id}`;
        try {
            const response = await axios.put(url, newData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            if (error.request.status === 400) {
                throw error.response.data;
            }
            throw error.message;
        }
    };

    // HTTP method delete
    static MethodDelete = async (endpoint, token, id) => {
        const url = CONST_URL + endpoint + `/${id}`;
        try {
            const response = await axios.delete(url,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            if (error.request.status === 400) {
                throw error.response.data;
            }
            throw error.message;
        }
    }
}