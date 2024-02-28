import axios from 'axios';
import { CONST_URL } from '../constants';

export class Service_Base {
    static MethodGet = (endpoint) => {
        const url = CONST_URL + endpoint;
        return new Promise((resolve, reject) => {
            axios.get(url).then(response => {
                if (response.status === 200){
                    resolve(response.data);
                } else {
                    resolve([]);
                }
            }).catch(error => {
                reject(error);
            });
        });
    };

    static MethodPost = (endpoint, value) => {
        const url = CONST_URL + endpoint;
        return new Promise((resolve, reject) => {
            axios.post(url, value).then((response) => {
                if (response.status === 200){
                    resolve(response.statusText);
                } else {
                    resolve(response.statusText);
                }
            }).catch((error) => {
                reject(error);
            });
        });
    };

    static MethodPut = (endpoint, id, value) => {
        const url = CONST_URL + endpoint + `/${id}`;
        return new Promise((resolve, reject) => {
            axios.put(url, value).then((response) => {
                if(response.status === 200){
                    resolve(response.statusText);
                } else {
                    resolve(response.statusText);
                }
            }).catch((error) => {
                reject(error);
            });
        });
    };
    
    static MethodDelete = (endpoint, id) => {
        const url = CONST_URL + endpoint + `/${id}`; 
        return new Promise((resolve, reject) => {
            axios.delete(url).then((reponse) => {
                if(reponse.status === 200){
                    resolve(reponse.statusText);
                } else {
                    resolve(reponse.statusText);
                }
            }).catch((error) => {
                reject(error);
            })
        });
    }
}