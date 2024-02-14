import { Session } from "./session";

export interface Topic {
    id: number;
    description: string;
    category: string;
    sessions: Session[]
}