import {User} from "../models/user";

export class AuthController {
    static get currentUser(): User | null {
        const localStorageVal = localStorage.getItem("currentUser")
        if (localStorageVal) return JSON.parse(localStorageVal) as User
        return null
    }

    static get isLoggedIn(): boolean {
        return !!AuthController.currentUser
    }
}
