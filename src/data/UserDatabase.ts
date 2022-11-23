import { CustomError } from "../error/customError";
import { userSignUp } from "../model/user";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {

  private static TABLE_NAME = "users_web";

  public findUserByUserName = async (userName: string) => {
    try {
  
      const result = await UserDatabase
        .connection(UserDatabase.TABLE_NAME)
        .select()
        .where({user_name: userName});

      return result[0];
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }

  public findUserByCPF = async (cpf: string) => {
    try {
  
      const result = await UserDatabase
        .connection(UserDatabase.TABLE_NAME)
        .select()
        .where({cpf});

      return result[0];
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }

  public signUp = async (user: userSignUp) => {
    try {

      await UserDatabase.connection
        .insert({
          user_id: user.userId,
          name: user.name,
          cpf: user.cpf,
          password: user.password
        })
        .into(UserDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

}
