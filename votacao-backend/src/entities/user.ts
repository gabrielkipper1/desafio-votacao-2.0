export class User {
    uid!: string;
    name!: string;
    email!: string;
    cpf!: string;

    constructor(uid: string | undefined, name: string | undefined, email: string | undefined, cpf: string | undefined) {
        if (!uid || !name || !email || !cpf) {
            throw new Error('Invalid input values');
        }

        this.uid = uid;
        this.name = name;
        this.email = email;
        this.cpf = cpf;
    }

}