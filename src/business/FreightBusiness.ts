import { FreightDatabase } from "../data/FreightDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { FreightInput, FreightInputDTO } from "../model/freights";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";

const idGenerator = new IdGenerator()
const freightDatabase = new FreightDatabase()
const tokenGenerator = new TokenGenerator()
const userDatabase = new UserDatabase()

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


    public deleteFreight = async (id: string): Promise<void> => {
        try {
            const freightDatabase = new FreightDatabase();
            await freightDatabase.deleteFreight(id);
        } catch (error: any) {
            throw new Error(error.message || error.sqlMessage);
        }
    }


    public editFreight = async (input: FreightInput, token: string): Promise<void> => {
        try {

            const { id, titulo, descricao, valor, prazo, destino, origem, pontuacao, data  } = input;

            const verifyToken = tokenGenerator.tokenData(token)
            console.log(verifyToken)

            const checkIfUserIdExists = await userDatabase.findUserByCPF(verifyToken.cpf)

            if (!checkIfUserIdExists.length) {
                throw new Error("Usuário não autorizado");
            }

            const checkIfIdExists = await freightDatabase.getFreightById(id)

            if (!checkIfIdExists.length) {
                throw new Error("Frete não encontrado");
            }

            
            await freightDatabase.editFreight(input);
        } catch (error: any) {
            throw new Error(error.message || error.sqlMessage);
        }
    }

}
