import { User } from "./user";

export class UserPassword {
    userId: number;
    password: string;

    private constructor(user: number | undefined, password: string) {
        if (!user || !password) {
            throw new Error("Invalid user or password");
        }
        this.userId = user;
        this.password = password;
    }

    public static create(userId: number, password: string) {
        return new UserPassword(userId, password);
    }
}