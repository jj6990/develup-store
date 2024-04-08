'use client';
import {useFormState} from "react-dom";
import {registerUserAction} from "@/data/actions/auth-actions";

const initialState = {
    data: null,
    errors: null,
    message: null
}
export default function SignUpRoute() {
    const [formState, formAction] = useFormState(registerUserAction, initialState);
    console.log('formState', formState)// to do create errors states
    return (
        <div>
            <h1>Sign Up</h1>
            <form action={formAction as string}>
                <div>
                    <label htmlFor="username">Name</label>
                    <input type="username" id="username" name="username"/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email"/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password"/>
                </div>
                <div>
                    <button type="submit">Sign up</button>
                </div>
            </form>
        </div>
    )
}
