import {Message} from "./message";
import {User} from "./user";

export class Chat {
    public messages: Message[] = [];
    public isArchived: boolean = false;

    public constructor(public recipients: User[]) {
    }
}
