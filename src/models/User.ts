export class User {
    constructor(public email: string, public name: string, private password: string) { }

    matches(another: User): boolean {
        return another !== undefined &&
            another.email === this.email &&
            another.password === this.password
    }
}

export const users: { [key: string]: User } = {
    "anacleto@gmail.com": new User('anacleto@gmail.com', 'Bruno Anacleto', 'bruno123'),
    "yagosansz@gmail.com": new User('yagosansz@gmail.com', 'Yago Santos', 'yago123')
}