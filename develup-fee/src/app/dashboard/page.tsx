import { logoutAction } from "@/data/actions/auth-actions";
export default function DashboardRoute() {
    return (
        <div>
            <h1>Dashboard</h1>
            <form action={logoutAction as string}>
                <button type="submit">logout</button>
            </form>
        </div>
    )
}
