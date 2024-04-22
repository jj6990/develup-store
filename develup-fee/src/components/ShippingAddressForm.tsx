"use client";
import React from "react";

import {useFormState} from "react-dom";
import {updateShippingAddressAction} from "@/data/actions/profile-actions";

const INITIAL_STATE = {
    data: null,
    strapiErrors: null,
    message: null,
};

export function ShippingAddressForm({data}) {

    const updateUserWithId = updateShippingAddressAction.bind(null, data.id);

    const [formState, formAction] = useFormState(
        updateUserWithId,
        INITIAL_STATE
    );

    console.log(data, formState);
    return (
        <form action={formAction as string}>
            <div>
                <div>
                    {/*create a dropdown for only available countries*/}
                    <input
                        id="country"
                        name="country"
                        placeholder="Country"
                        defaultValue={data.country || ""}
                    />
                    <input
                        id="city"
                        name="city"
                        placeholder="City"
                        defaultValue={data.city || ""}
                    />
                    <input
                        id="addressLine1"
                        name="addressLine1"
                        placeholder="Address"
                        defaultValue={data.addressLine1 || ""}
                    />
                    <input
                        id="addressLine2"
                        name="addressLine2"
                        placeholder="More Address"
                        defaultValue={data.addressLine2 || ""}
                    />
                    <input
                        id="zipCode"
                        name="zipCode"
                        placeholder="ZipCode"
                        defaultValue={data.zipCode || ""}
                    />
                    <label>
                        use this as billing address
                        <input
                            type="checkbox"
                            id="useAddressForBilling"
                            name="useAddressForBilling"
                            defaultChecked={data.useAddressForBilling}

                        />
                    </label>

                </div>
            </div>
            <div>
                <button type="submit">
                    submit
                </button>
            </div>
            {/*//add errors from formState*/}
        </form>
    );
}
