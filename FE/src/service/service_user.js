import { Service_Base } from "./service_base";

export class Service_User {
    static GetUser = async () => {
        const endpoint = '/users/getUsers';
        try {
            const data = await Service_Base.MethodGet(endpoint);
            return data;
        } catch (error) {
            throw error;
        }
    };

    static DeleteUser = async (id) => {
        const endpoint = '/users/deleteUser';
        try{
            const data = await Service_Base.MethodDelete(endpoint, id);
            return data;
        } catch (error){
            throw error;
        }
    }
}