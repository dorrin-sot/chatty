import {User} from "../models/user";
import {Result} from "../utils/result";
import {Error} from "../utils/error";


export class AuthController {
    static login(username: string, password: string): Result {
        if (!username || !password) {
            const errors: Error[] = []
            if (!username)
                errors.push({field: 'username', message: 'Username is mandatory'})
            if (!password)
                errors.push({field: 'password', message: 'Password is mandatory'})
            return new Result(false, errors)
        }
        const allUsers = this.allUsers
        const user = allUsers[allUsers.findIndex((u) => u.username === username)]
        if (!user)
            return new Result(false, [{field: 'username', message: 'Username doesn\'t exists'}])
        if (user.password !== password)
            return new Result(false, [{field: 'password', message: 'Incorrect password'}])

        localStorage.setItem("currentUser", JSON.stringify(user))
        return new Result(true, [])
    }

    static signup(username: string, email: string, password: string): Result {
        if (!username || !password) {
            const errors: Error[] = []
            if (!username)
                errors.push({field: 'username', message: 'Username is mandatory'})
            if (!email)
                errors.push({field: 'email', message: 'Email is mandatory'})
            if (!password)
                errors.push({field: 'password', message: 'Password is mandatory'})
            return new Result(false, errors)
        }
        const allUsers = this.allUsers
        if (allUsers.findIndex((u) => u.username === username) !== -1)
            return new Result(false, [{field: 'username', message: 'Username already exists'}])
        if (allUsers.findIndex((u) => u.email === email) !== -1)
            return new Result(false, [{field: 'email', message: 'Email already exists'}])

        const user: User = {username, password, email, chats: [], blockedUsers: []};
        localStorage.setItem("allUsers", JSON.stringify([...allUsers, user]))
        return this.login(username, password)
    }

    static get allUsers(): User[] {
        return JSON.parse(localStorage.getItem("allUsers") || "[]")
    }

    static get currentUser(): User | null {
        const localStorageVal = localStorage.getItem("currentUser")
        if (localStorageVal) return JSON.parse(localStorageVal) as User
        return null
    }

    static get isLoggedIn(): boolean {
        return !!AuthController.currentUser
    }
}
