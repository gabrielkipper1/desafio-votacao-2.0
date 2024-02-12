import { User } from "../../interfaces/user";

export interface UserTokenData {
    user: User;
    token: string;
    isAdmin: boolean;
}