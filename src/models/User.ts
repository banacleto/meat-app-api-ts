export class User {
    public fullName: string
    constructor(public email: string, public firstName: string, public middleName: string,
        public lastName: string, private password: string) {
        this.fullName = this.firstName + ' ' + this.middleName + ' ' + this.lastName
    }

    matches(another: User): boolean {
        return another !== undefined &&
            another.email === this.email &&
            another.password === this.password
    }
}

export const users: { [key: string]: User } = {
    "anacleto@gmail.com": new User('anacleto@gmail.com', 'Bruno', 'Anacleto', 'Santos de Sousa', 'bruno123'),
    "yagosansz@gmail.com": new User('yagosansz@gmail.com', 'Yago', '', 'Santos de Sousa', 'yago123')
}