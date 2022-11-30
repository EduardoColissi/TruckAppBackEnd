import { FreightInput } from "../model/freights";
import { BaseDatabase } from "./BaseDatabase";


export class FreightDatabase extends BaseDatabase {
    private static TABLE_NAME = "freights";

    public async createFreight(input: FreightInput): Promise<void> {
        try {
            await FreightDatabase.connection(FreightDatabase.TABLE_NAME)
                .insert({
                    id: input.id,
                    titulo: input.titulo,
                    descricao: input.descricao,
                    valor: input.valor,
                    prazo: input.prazo,
                    destino: input.destino,
                    origem: input.origem,
                    pontuacao: input.pontuacao,
                    data: input.data
                })
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async getFreight(): Promise<any> {
        try {
            const result = await FreightDatabase
            .connection(FreightDatabase.TABLE_NAME)
                .select("*")
            return result;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }


    public async deleteFreight(id: string): Promise<void> {
        try {

            const checkIfIdExists = await FreightDatabase.connection(FreightDatabase.TABLE_NAME)
            .where({id})

            if (!checkIfIdExists.length) {
                throw new Error("Frete não encontrado");
            }

            await FreightDatabase.connection(FreightDatabase.TABLE_NAME)
                .where({ id }).del()
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
    }
    }
}