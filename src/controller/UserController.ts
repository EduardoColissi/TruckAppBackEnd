import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { EditUserInputDTO, LoginInputDTO, userSignUpDTO } from "../model/user";

export class UserController {

      public signup = async (req: Request, res: Response) => {
        try {
          const { userName, name, password } = req.body

// Os dados de signup usados nesse código são apenas o mínimo para teste. 
// Futuramente mais dados do usuário serão adicionados.

          const input: userSignUpDTO = {
            name,
            userName,
            password
          }

          const userBusiness = new UserBusiness()
          const token = await userBusiness.createUser(input);
    
          res.status(201).send({ message: "Usuário criado!", token });
        } catch (error: any) {
          res.status(400).send(error.message);
        }
      } 


      public login = async (req: Request, res: Response) => {
        try {
          const { userName, password } = req.body;

          const input: LoginInputDTO = {
            userName,
            password
          }

          const userBusiness = new UserBusiness()
          const token = await userBusiness.login(input);
    
          res.status(200).send({ message: "Usuário logado!", token });
        } catch (error: any) {
          res.status(400).send(error.message);
        }
      }



}
