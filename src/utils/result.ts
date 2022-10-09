import {Error} from "./error";

export class Result {
    public constructor(public success: boolean, public errors: Error[]) {
    }
}
