import { MockUserRepository } from "../mocks/mock-user-repository";
import { User } from "../../src/entities/user";
import { UserController } from "../../src/controllers/user-controller";

describe("UserController", () => {
    let userController: UserController;
    let userRepository: MockUserRepository;

    beforeEach(() => {
        userRepository = new MockUserRepository();
        userController = new UserController(userRepository);
    });

    it("should save a user", async () => {
        const user = User.create("Foo User", "foo@test.com)", "1234");
        const savedUser = await userController.createUser(user);
        expect(savedUser).toBe(user);
    });

    it("should get a user by id", async () => {
        const userId = 1;
        const user = User.existing(userId, "Foo User", "foo@test.com", "1234");
        await userRepository.saveUser(user);
        const foundUser = await userController.getUserById(userId);
        expect(foundUser?.id).toEqual(userId);
    });

    it("should return undefined if user not found", async () => {
        const foundUser = await userController.getUserById(1);
        expect(foundUser).toBeUndefined();
    });

});