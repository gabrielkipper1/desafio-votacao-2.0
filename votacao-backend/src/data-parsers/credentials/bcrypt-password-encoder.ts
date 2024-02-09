import { PasswordEncoder } from "../../interfaces/password-encoder";
import bcrypt from "bcrypt";

export class BCryptPasswordEncoder implements PasswordEncoder {
    saltRounds = 5;

    async encode(password: string): Promise<string> {
        return await bcrypt.hash(password, this.saltRounds);
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

}