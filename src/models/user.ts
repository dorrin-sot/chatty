import {Chat} from "./chat";

export class User {
    public constructor(public username: string, public password: string, public chats: Chat[], public blockedUsers: User[]) {
    }
}
