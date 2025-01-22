'use client'

import Link from "next/link";
import ButtonImg from "@/app/ui/imgbutton";

export default function SideNav({ children }) {
    return (
        <div className="fixed top-0 left-0 w-20 min-h-screen flex flex-col items-center bg-blue-900">
            <div className="mt-4 mb-4">
                <Link href="/dashboard">
                    <ButtonImg
                        imgSrc="/LogoGeoviz.png"
                        imgAlt="Logo GeoViz"
                        width={75}
                        height={75}
                    />
                </Link>
            </div>
            {children}
        </div>
    );
}
