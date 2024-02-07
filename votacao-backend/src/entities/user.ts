export class User {
    id: number | undefined;
    name: string;
    email: string;
    cpf: string;

    private constructor(uid: number | undefined, name: string | undefined, email: string | undefined, cpf: string | undefined) {
        if (!name || !email || !cpf) {
            throw new Error('Invalid input values');
        }

        this.id = uid;
        this.name = name;
        this.email = email;
        this.cpf = cpf;
    }

    static create(name: string | undefined, email: string | undefined, cpf: string | undefined) {
        return new User(undefined, name, email, cpf);
    }

    static existing(uid: number | undefined, name: string | undefined, email: string | undefined, cpf: string | undefined) {
        if (!uid) throw new Error('Invalid user Id');
        return new User(uid, name, email, cpf);
    }



}