import { getAuthToken } from "./get-token";
import {flattenAttributes, getStrapiURL} from "@/lib/utils";
import qs from "qs";

const query = qs.stringify({
    populate: { image: { fields: ["url", "alternativeText"] } },
});

export async function getUserMeAdresses() {
    const baseUrl = getStrapiURL();

    const url = new URL("/api/shipping-addresses", baseUrl);
    url.search = query;

    const authToken = await getAuthToken();
    if (!authToken) return { ok: false, data: null, error: null };

    try {
        const response = await fetch(url.href, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            cache: "no-cache",
        });

        const data = await response.json();

        const flattenedData = flattenAttributes(data);

        if (data.error) return { ok: false, data: null, error: data.error };

        return { ok: true, data: flattenedData, error: null };

    } catch (error) {
        console.log(error);
        return { ok: false, data: null, error: error };
    }
}
