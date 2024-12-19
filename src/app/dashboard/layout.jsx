'use client'

import SideNav from "../ui/sidenav"

export default function AdminDashboard ({ children }) {
    return (
        <div className="flex min-h-screen bg-gray-200">
            <div>
                <SideNav />
            </div>
            <div className="flex-grow">
                {children}
            </div>
        </div>
    );
}