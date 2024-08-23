import { Request, Response } from 'express';
import { Model_Roles } from '../models/model_roles';

export class Controller_Roles {
// Requires get list roles
public static getRoles = async (req: Request, res: Response) => {
    try{
        const roles = await Model_Roles.getRoles();
        return res.status(200).json(roles);
    } catch (error) {
        return res.status(400).send(`API getRoles ${error}`);
    }
}
};