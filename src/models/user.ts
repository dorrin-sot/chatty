import {Chat} from "./chat";

export interface User {
     username: string;
     email: string;
     password: string;
     chats: Chat[];
     blockedUsers: User[];
}
