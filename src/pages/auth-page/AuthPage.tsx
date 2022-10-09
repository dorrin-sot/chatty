import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AuthController} from "../../controllers/auth-controller";
import {Error} from "../../utils/error";


function AuthPage() {
    const navigate = useNavigate()

    const [isLogin, setIsLogin] = useState(true)

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [errors, setErrors] = useState([] as Error[])

    const toggleIsLogin = () => {
        setIsLogin(!isLogin)
        setUsername("")
        setPassword("")
        setEmail("")
        setErrors([])
    }

    const onLogin = (e: FormEvent) => {
        const loginResult = AuthController.login(username, password)
        if (!!username && !!password && loginResult.success) {
            navigate("/chats")
        } else {
            setErrors(loginResult.errors)
            e.preventDefault()
        }
    }

    const onSignup = (e: FormEvent) => {
        const signupResult = AuthController.signup(username, email, password)
        if (!!username && !!email && !!password && signupResult.success) {
            navigate("/chats")
        } else {
            setErrors(signupResult.errors)
            e.preventDefault()
        }
    }

    return (
        <div className="auth-wrapper">
            <form onSubmit={isLogin ? onLogin : onSignup}>
                <label>
                    Username
                    <input type="text" value={username} onChange={({target: {value}}) => setUsername(value)}/>
                    {getError(errors, 'username') && (<span className="error">{getError(errors, 'username')}</span>)}
                </label>
                {!isLogin && (
                    <label>
                        Email
                        <input type="email" value={email} onChange={({target: {value}}) => setEmail(value)}/>
                        {getError(errors, 'email') && (<span className="error">{getError(errors, 'email')}</span>)}
                    </label>
                )}
                <label>
                    Password
                    <input type="password" value={password} onChange={({target: {value}}) => setPassword(value)}/>
                        {getError(errors, 'password') && (<span className="error">{getError(errors, 'password')}</span>)}
                </label>
                <button type="submit">{isLogin ? "Login" : "Sign up"}</button>
            </form>
            {isLogin && (
                <div className="form-switcher">
                    <p>Don't have an account?</p>
                    <button onClick={toggleIsLogin}>Create one here!</button>
                </div>
            )}
            {!isLogin && (
                <div className="form-switcher">
                    <p>Already have an account?</p>
                    <button onClick={toggleIsLogin}>Login here!</button>
                </div>
            )}
        </div>
    )
}

function getError(errors: Error[], field: string): string | null {
    return (errors[errors.findIndex((e) => e.field === field)] || null)?.message
}

export default AuthPage;
