import { Service_Base } from "./service_base";

export class Service_Role {
    // HTTP get list role
    static GetRole = async (token) => {
        const endpoint = '/roles/getRoles';
        try{
            const data = await Service_Base.MethodGet(endpoint, token);
            return data;
        } catch (error) {
            throw error;
        }
    }
}