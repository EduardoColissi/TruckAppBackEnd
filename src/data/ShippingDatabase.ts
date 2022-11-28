import { ShippingInput, ShippingInputDTO } from "../model/shipping";
import { BaseDatabase } from "./BaseDatabase";


export class ShippingDatabase extends BaseDatabase {
    private static TABLE_NAME = "shipping";

    public async createShipping(input: ShippingInput): Promise<void> {
        try {
            await ShippingDatabase.connection()
                .insert({
                    id: input.id,
                    title: input.title,
                    descricao: input.descricao,
                    valor: input.valor,
                    prazo: input.prazo,
                    destino: input.destino,
                    origem: input.origem,
                    pontuacao: input.pontuacao,
                })
                .into(ShippingDatabase.TABLE_NAME);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}