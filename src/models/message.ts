import {User} from "./user";

export class Message {
    public seenByUsers: User[] = [];
    public isEdited: boolean = false;

    public constructor(public textContent: string, public sender: User, public dateTimeEpoch: number) {
    }

    public get dateTime(): Date {
        return new Date(this.dateTimeEpoch)
    }
}
