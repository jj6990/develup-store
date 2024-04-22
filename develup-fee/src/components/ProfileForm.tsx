"use client";
import React from "react";

import { useFormState } from "react-dom";
import { updateProfileAction } from "@/data/actions/profile-actions";

const INITIAL_STATE = {
    data: null,
    strapiErrors: null,
    message: null,
};
export function ProfileForm({data}) {

    const updateUserWithId = updateProfileAction.bind(null, data.id);

    const [formState, formAction] = useFormState(
        updateUserWithId,
        INITIAL_STATE
    );

    return (
        <form action={formAction as string}>
            <div>
                <div>
                    <input
                        id="username"
                        name="username"
                        placeholder="Username"
                        defaultValue={data.username || ""}
                        disabled
                    />
                    <input type="hidden" name="id" value={data.id} />
                    <input
                        id="email"
                        name="email"
                        placeholder="Email"
                        defaultValue={data.email || ""}
                        disabled
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <input
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                        defaultValue={data.firstName || ""}
                    />
                    <input
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name"
                        defaultValue={data.lastName || ""}
                    />
                </div>
            </div>
            <div className="flex justify-end">
                <button type="submit">
                    submit
                </button>
            </div>
            {/*//add errors from formState*/}
        </form>
    );
}
