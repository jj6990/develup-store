"use server";
import qs from "qs";
import {mutateData} from "@/data/services/mutate-data";
import {flattenAttributes} from "@/lib/utils";

export async function updateProfileAction(
    userId: string,
    prevState: any,
    formData: FormData
) {
    const rawFormData = Object.fromEntries(formData);

    const query = qs.stringify({
        populate: "*",
    });

    const payload = {
        firstName: rawFormData.firstName,
        lastName: rawFormData.lastName
    };

    const responseData = await mutateData(
        "PUT",
        `/api/users/${userId}?${query}`,
        payload
    );

    if (!responseData) {
        return {
            ...prevState,
            strapiErrors: null,
            message: "Ops! Something went wrong. Please try again.",
        };
    }

    if (responseData.error) {
        return {
            ...prevState,
            strapiErrors: responseData.error,
            message: "Failed to Register.",
        };
    }

    const flattenedData = flattenAttributes(responseData);

    return {
        ...prevState,
        message: "Profile Updated",
        data: flattenedData,
        strapiErrors: null,
    };
}

export async function updateShippingAddressAction(
    userId: string,
    prevState: any,
    formData: FormData
) {
    const rawFormData = Object.fromEntries(formData);

    const query = qs.stringify({
        populate: "*",
    });

    const payload = {
        data: {
            addressLine1: rawFormData.addressLine1,
            addressLine2: rawFormData.addressLine2,
            city: rawFormData.city,
            zipCode: rawFormData.zipCode,
            country: rawFormData.country,
            useAddressForBilling:rawFormData.useAddressForBilling === "on",
        }
    };

    const responseData = await mutateData(
        "PUT",
        `/api/shipping-addresses/${userId}?${query}`,
        payload
    );

    if (!responseData) {
        return {
            ...prevState,
            strapiErrors: null,
            message: "Ops! Something went wrong. Please try again.",
        };
    }

    if (responseData.error) {
        return {
            ...prevState,
            strapiErrors: responseData.error,
            message: "Failed to Register.",
        };
    }

    const flattenedData = flattenAttributes(responseData);

    return {
        ...prevState,
        message: "Profile Shipping Address Updated",
        data: flattenedData,
        strapiErrors: null,
    };
}
