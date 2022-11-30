import { FreightDatabase } from "../data/FreightDatabase";
import { FreightInputDTO } from "../model/freights";
import { IdGenerator } from "../services/IdGenerator";

const idGenerator = new IdGenerator()

export class FreightBusiness {
    public createFreight = async (input: FreightInputDTO): Promise<void> => {
        try {
        if ( !input.titulo || !input.descricao || !input.valor || !input.prazo || !input.destino || !input.origem || !input.pontuacao || !input.data ) {
            throw new Error("Preencha todos os campos");
        }

        const freightId: string = idGenerator.generateId()

        const freightData = {
            id: freightId,
            titulo: input.titulo,
            descricao: input.descricao,
            valor: input.valor,
            prazo: input.prazo,
            destino: input.destino,
            origem: input.origem,
            pontuacao: input.pontuacao,
            data: input.data

        }
    
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

}