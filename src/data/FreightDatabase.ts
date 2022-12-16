import { FreightInput, FreightInputDTO } from "../model/freights";
import { BaseDatabase } from "./BaseDatabase";

export class FreightDatabase extends BaseDatabase {
  private static TABLE_NAME = "freights";

  public async createFreight(input: FreightInput): Promise<void> {
    try {
      await FreightDatabase.connection(FreightDatabase.TABLE_NAME).insert({
        id: input.id,
        code: input.code,
        description: input.description,
        value: input.value,
        deadline: input.deadline,
        destiny: input.destiny,
        origin: input.origin,
        points: input.points,
        date: input.date,
        trucktype: input.trucktype,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async getFreight(): Promise<any> {
    try {
      const result = await FreightDatabase.connection(
        FreightDatabase.TABLE_NAME
      ).select("*");
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async deleteFreight(id: string): Promise<void> {
    try {
      const checkIfIdExists = await FreightDatabase.connection(
        FreightDatabase.TABLE_NAME
      ).where({ id });

      if (!checkIfIdExists.length) {
        throw new Error("Frete não encontrado");
      }

      await FreightDatabase.connection(FreightDatabase.TABLE_NAME)
        .where({ id })
        .del();
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public editFreight = async (input: FreightInput): Promise<void> => {
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

    const checkIfIdExists = await FreightDatabase.connection(
      FreightDatabase.TABLE_NAME
    ).where({ id });

    if (!checkIfIdExists.length) {
      throw new Error("Frete não encontrado");
    }

    await FreightDatabase.connection(FreightDatabase.TABLE_NAME)
      .where({ id })
      .update({
        code: input.code,
        description: input.description,
        value: input.value,
        deadline: input.deadline,
        destiny: input.destiny,
        origin: input.origin,
        points: input.points,
        date: input.date,
        trucktype: input.trucktype,
      });
  };

  public getFreightById = async (id: string): Promise<any> => {
    try {
      const result = await FreightDatabase.connection(
        FreightDatabase.TABLE_NAME
      )
        .where({ id })
        .select("*");
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}
