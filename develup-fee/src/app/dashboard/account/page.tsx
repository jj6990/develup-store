import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import {getUserMeAdresses} from "@/data/services/get-user-me-addresses";
import {ProfileForm} from "@/components/ProfileForm";
import {ShippingAddressForm} from "@/components/ShippingAddressForm";
// import { ProfileImageForm } from "@/components/forms/ProfileImageForm";

export default async function AccountRoute() {
    const user = await getUserMeLoader();
    const userAddress = await getUserMeAdresses();
    const userData = user.data;
    const userAddressData = userAddress.data.data[0];

    console.log(userAddressData);
    return (
        <div>
            Account Page
            create a form to update user data
            <ProfileForm data={userData} />
            <ShippingAddressForm data={userAddressData} />
        </div>
    );
}
