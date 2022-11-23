import { UserDatabase } from "../data/UserDatabase";
import { CustomError, InvalidName, InvalidPassword, UserNotFound } from "../error/customError";
import { LoginInputDTO, userSignUp, userSignUpDTO } from "../model/user";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";
import { HashManager } from "../services/HashManager";
import {isCPForCNPJ} from "js-cpf-cnpj-validation"

const idGenerator = new IdGenerator()
const tokenGenerator = new TokenGenerator()
const userDatabase = new UserDatabase()
const hashManager = new HashManager()


export class UserBusiness {
  public createUser = async (input: userSignUpDTO): Promise<void> => {
    try {
      const { name, cpf, password } = input;

      if ( !name || !cpf || !password) {
        throw new CustomError( 
          400,
          'Preencha os campos "Nome","Usuário" e "Senha".'
        )
      }
      
      if (name.length < 4) {
        throw new InvalidName();
      }

      const splitName = name.split("")
      
      if (splitName.includes("0") || splitName.includes("1") || splitName.includes("2") || splitName.includes("3") || splitName.includes("4") || splitName.includes("5") || splitName.includes("6") || splitName.includes("7") || splitName.includes("8") || splitName.includes("9")) {
        throw new InvalidName();
      }

      console.log(cpf)

      if (!isCPForCNPJ(cpf)) {
        throw new CustomError(
          400,
          "CPF inválido."
        )
      }

      if (password.length < 6) {
        throw new InvalidPassword()
      }

      const checkIfNameAlreadyExists = await userDatabase.findUserByCPF(cpf)
      if (checkIfNameAlreadyExists) {
        throw new CustomError(400, "Usuário já existe.")
      }

      const id: string = idGenerator.generateId()
      const passwordHash: string = await hashManager.hashGenerator(password)

      const user: userSignUp = {
        id,
        cpf,
        name,
        password: passwordHash
      }

      await userDatabase.signUp(user);

    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }


  public login = async (input: LoginInputDTO): Promise<void> => {
    try {
      const { cpf, password } = input;
    
      if (!cpf || !password) {
        throw new CustomError(
          400,
          'Preencha os campos "Usuário" e "Senha".'
        );
      }

      const user = await userDatabase.findUserByCPF(cpf);

      if (!user) {
        throw new UserNotFound()
      }

      const passwordIsCorrect: boolean = await hashManager.hashCompare(password, user.password)

      if(!passwordIsCorrect){ 
        throw new InvalidPassword()
      }

      await userDatabase.findUserByCPF(user.cpf)

    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };


}
