import {logoutAction} from "@/data/actions/auth-actions";
import {getUserMeLoader} from "@/data/services/get-user-me-loader";

export default async function DashboardRoute() {
    const user = await getUserMeLoader();
    if (user) {

        console.log(user);
    }
    return (
        <div>
            <h1>Dashboard</h1>
            <form action={logoutAction as string}>
                <button type="submit">logout</button>
            </form>
        </div>
    )
}
