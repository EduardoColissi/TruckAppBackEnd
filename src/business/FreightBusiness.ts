import { FreightDatabase } from "../data/FreightDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { FreightInput, FreightInputDTO } from "../model/freights";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";

const idGenerator = new IdGenerator();
const freightDatabase = new FreightDatabase();
const tokenGenerator = new TokenGenerator();
const userDatabase = new UserDatabase();

export class FreightBusiness {
  public createFreight = async (input: FreightInputDTO): Promise<void> => {
    try {
      if (
        !input.code ||
        !input.description ||
        !input.value ||
        !input.deadline ||
        !input.destiny ||
        !input.origin ||
        !input.points ||
        !input.date ||
        !input.trucktype
      ) {
        throw new Error("Preencha todos os campos");
      }

      const freightId: string = idGenerator.generateId();

      const freightData = {
        id: freightId,
        code: input.code,
        description: input.description,
        value: input.value,
        deadline: input.deadline,
        destiny: input.destiny,
        origin: input.origin,
        points: input.points,
        date: input.date,
        trucktype: input.trucktype,
      };

      const freightDatabase = new FreightDatabase();
      await freightDatabase.createFreight(freightData);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  public getFreights = async (): Promise<any> => {
    try {
      const freightDatabase = new FreightDatabase();
      const result = await freightDatabase.getFreight();
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  public deleteFreight = async (id: string): Promise<void> => {
    try {
      const freightDatabase = new FreightDatabase();
      await freightDatabase.deleteFreight(id);
    } catch (error: any) {
      throw new Error(error.message || error.sqlMessage);
    }
  };

  public editFreight = async (
    input: FreightInput,
    token: string
  ): Promise<void> => {
    try {
      const {
        id,
        code,
        description,
        value,
        deadline,
        destiny,
        origin,
        points,
        date,
        trucktype,
      } = input;

      const verifyToken = tokenGenerator.tokenData(token);

      const checkIfUserIdExists = await userDatabase.findUserByCPF(
        verifyToken.cpf
      );

      if (!checkIfUserIdExists.length) {
        throw new Error("Usuário não autorizado");
      }

      const checkIfIdExists = await freightDatabase.getFreightById(id);

      if (!checkIfIdExists.length) {
        throw new Error("Frete não encontrado");
      }

      await freightDatabase.editFreight(input);
    } catch (error: any) {
      throw new Error(error.message || error.sqlMessage);
    }
  };
}
