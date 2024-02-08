import { User } from "../../entities/user";
import { DataParser } from "../data-parser";
import { objectToMap } from "../map/map-parser";

export class UserJsonParser implements DataParser<User> {
    parse(data: any): User {
        console.log("UserJsonParser.parse", data);
        console.log("UserJsonParser.parse", typeof data);

        if (!data) {
            throw new Error("Empty user data");
        }

        if (typeof data === 'object' && data !== null) {
            data = objectToMap(data);
        }

        if (typeof data === 'string') {
            data = JSON.parse(data);
        }

        if (!(data instanceof Map)) {
            throw new Error("Invalid data");
        }

        if (data.get('id') !== undefined) {
            return User.existing(data.get('id'), data.get('name'), data.get('email'), data.get('cpf'));
        }
        return User.create(data.get('name'), data.get('email'), data.get('cpf'));


    }
    stringify(data: User): string {
        return JSON.stringify(data);
    }

}