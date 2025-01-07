import Link from "next/link";
import Login from "./auth/acceder/page";
import AdminDashboard from "./dashboard/layout";

export default function Home() {
  return (
    <Link href="/dashboard">
      <AdminDashboard />
    </Link>
    /*<Link href="/auth/acceder">
      <Login />
    </Link>*/
  );
}
