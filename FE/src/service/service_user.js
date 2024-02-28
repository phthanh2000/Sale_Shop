import { Service_Base } from "./service_base";

export class Service_User {
    static GetAllUser () {
        const endpoint = '/users/getAllUsers';
        return new Promise((resolve, reject) => {
            Service_Base.MethodGet(endpoint).then((arrData) => {
                resolve(arrData);
            }).catch(errorMessage => {
                reject(errorMessage);
            });
        });
    };
}