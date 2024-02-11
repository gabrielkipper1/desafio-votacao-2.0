import { Vote } from "./vote";

export class User {
    id: number | undefined;
    name: string | undefined;
    email: string | undefined;
    cpf: string | undefined;
    votes: Vote[]

    private constructor(uid: number | undefined, name: string | undefined, email: string | undefined, cpf: string | undefined) {
        this.id = uid;
        this.name = name;
        this.email = email;
        this.cpf = cpf;
        this.votes = [];
    }

    static create(name: string | undefined, email: string | undefined, cpf: string | undefined) {
        if (!name || !email || !cpf) {
            throw new Error('Invalid input values');
        }
        return new User(undefined, name, email, cpf);
    }

    static existing(uid: number | undefined, name: string | undefined, email: string | undefined, cpf: string | undefined) {
        if (!uid) throw new Error('Invalid user Id');

        if (!name || !email || !cpf) {
            throw new Error('Invalid input values');
        }

        return new User(uid, name, email, cpf);
    }

    static fromId(id: number | undefined) {
        if (!id) throw new Error('Invalid user Id');
        return new User(id, '', '', '');
    }

}