'use server'
import {z} from 'zod';
import {cookies} from 'next/headers';
import {registerUserService, loginUserService} from "@/data/services/auth-services";
import {redirect} from "next/navigation";

const config = {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
    domain: process.env.HOST ?? "localhost",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
};

const registerUserSchema = z.object({
    username: z.string().min(3, {
        message: 'username must be between 3 and 20 characters'
    }),
    email: z.string().email({
        message: 'Please enter a valid email address'
    }),
    password: z.string().min(6, {
        message: 'Password must be at least 6 characters'
    })
});

export async function registerUserAction(prevState, formData: FormData) {
    const fields = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password')
    };

    const validatedData = registerUserSchema.safeParse(fields);

    if (!validatedData.success) {
        return {
            ...prevState,
            errors: validatedData.error.flatten().fieldErrors,
            message: 'Please correct the following errors'
        }
    }

    const responseData = await registerUserService(validatedData.data);

    if (!responseData) {
        return {
            ...prevState,
            strapiErrors: null,
            errors: null,
            message: 'Ops! Something went wrong. Please try again later'
        }
    }

    if (responseData.error) {
        return {
            ...prevState,
            strapiErrors: responseData.error,
            errors: null,
            message: 'failed to register'
        }
    }

    cookies().set("jwt" as any, responseData.jwt, config as any);
    redirect("/dashboard");

    return {
        ...prevState,
        data: 'ok',
        strapiErrors: null,
        errors: null,
        message: 'User registered successfully'
    }
}

const schemaLogin = z.object({
    identifier: z
        .string()
        .min(3, {
            message: "Identifier must have at least 3 or more characters",
        })
        .max(20, {
            message: "Please enter a valid username or email address",
        }),
    password: z
        .string()
        .min(6, {
            message: "Password must have at least 6 or more characters",
        })
        .max(100, {
            message: "Password must be between 6 and 100 characters",
        }),
});

export async function loginUserAction(prevState: any, formData: FormData) {
    const validatedFields = schemaLogin.safeParse({
        identifier: formData.get("identifier"),
        password: formData.get("password"),
    });

    if (!validatedFields.success) {
        return {
            ...prevState,
            zodErrors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Login.",
        };
    }

    const responseData = await loginUserService(validatedFields.data);

    if (!responseData) {
        return {
            ...prevState,
            strapiErrors: responseData.error,
            zodErrors: null,
            message: "Ops! Something went wrong. Please try again.",
        };
    }

    if (responseData.error) {
        return {
            ...prevState,
            strapiErrors: responseData.error,
            zodErrors: null,
            message: "Failed to Login.",
        };
    }

    cookies().set("jwt" as any, responseData.jwt);
    redirect("/dashboard");
}

export async function logoutAction() {
    cookies().set("jwt" as any, "" as any, {...config, maxAge: 0} as any);
    redirect("/");
}
