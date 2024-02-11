export class UserAdmin {
    active: boolean;
    userId: number;

    private constructor(userId: number, active: boolean) {
        if (!userId || !active) {
            throw new Error("Invalid user or password");
        }
        this.userId = userId;
        this.active = active;
    }

    public static create(userId: number, active: boolean) {
        return new UserAdmin(userId, active);
    }
}