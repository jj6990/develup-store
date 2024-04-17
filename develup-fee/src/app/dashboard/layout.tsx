import Link from "next/link";

export default async function DashboardLayout({children, }: {readonly children: React.ReactNode; }) {
    return (
        <div>
            <nav>
                dashboard nav
            </nav>
            <main>{children}</main>
        </div>
    );
}
