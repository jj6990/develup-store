import {logoutAction} from "@/data/actions/auth-actions";
import {getUserMeLoader} from "@/data/services/get-user-me-loader";
import Link from "next/link";

export default async function DashboardRoute() {
    const user = await getUserMeLoader();
    if (user) {

        console.log(user);
    }
    return (
        <div>
            <h1>Dashboard</h1>
            <form action={logoutAction as string}>
                <Link href={{pathname: "/dashboard/account"}}>Account</Link>
                <button type="submit">logout</button>
            </form>
        </div>
    )
}
