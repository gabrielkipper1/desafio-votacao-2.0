import { User } from "../../entities/user";
import { BadRequestError } from "../../exceptions/bad-request-error";
import { ERROR_MESSAGES } from "../../exceptions/erro-messages";
import { DataParser } from "../data-parser";
import { objectToMap } from "../map/map-parser";

export class UserJsonParser implements DataParser<User> {
    parse(data: any): User {
        if (!data) {
            throw new BadRequestError(ERROR_MESSAGES.USER_INVALID_DATA);
        }

        if (typeof data === 'object' && data !== null) {
            data = objectToMap(data);
        }

        if (typeof data === 'string') {
            data = JSON.parse(data);
        }

        if (!(data instanceof Map)) {
            throw new BadRequestError(ERROR_MESSAGES.USER_INVALID_DATA);
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