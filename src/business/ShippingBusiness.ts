import { ShippingDatabase } from "../data/ShippingDatabase";
import { ShippingInputDTO } from "../model/shipping";
import { IdGenerator } from "../services/IdGenerator";

const idGenerator = new IdGenerator()

export class ShippingBusiness {
    public createShipping = async (input: ShippingInputDTO) => {
        try {
        if (!input.title || !input.descricao || !input.valor || !input.prazo || !input.destino || !input.origem || !input.pontuacao) {
            throw new Error("Preencha todos os campos");
        }

        const shippingId: string = idGenerator.generateId()

        const shippingData = {
            id: shippingId,
            title: input.title,
            descricao: input.descricao,
            valor: input.valor,
            prazo: input.prazo,
            destino: input.destino,
            origem: input.origem,
            pontuacao: input.pontuacao,

        }
    
        const shippingDatabase = new ShippingDatabase();
        await shippingDatabase.createShipping(shippingData);
        } catch (error: any) {
        throw new Error(error.message);
        }
    };
}