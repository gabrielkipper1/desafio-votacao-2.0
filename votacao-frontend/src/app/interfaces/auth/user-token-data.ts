import { User } from "../user";

export interface UserTokenData {
    user: User;
    token: string;
    isAdmin: boolean;
}