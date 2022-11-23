import * as bcrypt from 'bcryptjs';

export class HashManager {

    public hashGenerator = async (str: string): Promise<string> => {

        const rounds = Number(process.env.BCRYPT_COST);
        const salt = await bcrypt.genSalt(rounds);
        const result = await bcrypt.hash(str, salt);

        return result;
    }

    public hashCompare = async (str: string, hash: string): Promise<boolean> => {

        const result = await bcrypt.compare(str, hash);
        return result;
    }

}