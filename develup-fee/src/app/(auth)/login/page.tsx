'use client'

import { useFormState } from "react-dom";
import { loginUserAction } from "@/data/actions/auth-actions";

const initialState = {
    data: null,
    errors: null,
    message: null
}
export default function LoginRoute(){
    const [formState, formAction] = useFormState(loginUserAction, initialState);
    // to do create errors states
    return (
        <div>
            <h1>Login</h1>

            <form action={formAction as string}>
                <div>
                    <label htmlFor="identifier">Email</label>
                    <input type="identifier" id="identifier" name="identifier"/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password"/>
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>

        </div>
    )
}
