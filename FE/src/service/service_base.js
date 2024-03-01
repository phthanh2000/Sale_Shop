import axios from 'axios';
import { CONST_URL } from '../constants';

export class Service_Base {
    static MethodGet = async (endpoint) => {
        const url = CONST_URL + endpoint;
        try{
            const response = await axios.get(url);
            if(response.status === 200){
                return response.data;
            }
        } catch (error){
            if(error.request.status === 400){
                throw error.response.data;
            }
            throw error.message; 
        }
    };

    static MethodPost = async (endpoint, data) => {
        const url = CONST_URL + endpoint;
        try { 
            const response = await Service_Base.MethodPost(url, data);
            if(response.status === 200){
                return response.data;
            }
        } catch (error) {
            if(error.request.status === 400){
                throw error.response.data;
            }
            throw error.message; 
        }
    };

    static MethodPut = async (endpoint, id, newData) => {
        const url = CONST_URL + endpoint + `/${id}`;
        try{
            const response = await axios.put(url, newData);
            if(response.status === 200){
                return response.data;
            }
        } catch (error){
            if(error.request.status === 400){
                throw error.response.data;
            }
            throw error.message; 
        }
    };
    
    static MethodDelete = async (endpoint, id) => {
        const url = CONST_URL + endpoint + `/${id}`; 
        try {
            const response = await axios.delete(url);
            if(response.status === 200){
                return response.data;
            }
        } catch (error){
            if(error.request.status === 400){
                throw error.response.data;
            }
            throw error.message;
        }
    }
}