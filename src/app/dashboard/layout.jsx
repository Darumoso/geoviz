'use client'

import ButtonImg from "@/app/ui/imgbutton"
import Link from "next/link"
import SideNav from "@/app/ui/sidenav"

export default function AdminDashboard ({ children }) {
    return (
        <div className="flex min-h-screen bg-gray-200">
            <SideNav>
                <nav className="flex flex-col justify-between h-full flex-grow">
                    <ul className="flex flex-col items-center space-y-4">
                        <li>
                            <Link href="/dashboard/usuarios">
                                <ButtonImg
                                    imgSrc="/users.png"
                                    imgAlt="Botón usuarios"
                                    width={30}
                                    height={30}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link href="/dashboard/instituciones">
                                <ButtonImg
                                    imgSrc="/institution.png"
                                    imgAlt="Botón instituciones"
                                    width={30}
                                    height={30}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link href="/dashboard/proyectos">
                                <ButtonImg
                                    imgSrc="/proyectos.png"
                                    imgAlt="Botón proyectos"
                                    width={30}
                                    height={30}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link href="/dashboard/datasets">
                                <ButtonImg
                                    imgSrc="/datasets.png"
                                    imgAlt="Botón datasets"
                                    width={30}
                                    height={30}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link href="/dashboard/bitacora">
                                <ButtonImg
                                    imgSrc="/bitacora.png"
                                    imgAlt="Botón bitácora"
                                    width={30}
                                    height={30}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link href="/visualizador">
                                <ButtonImg
                                    imgSrc="/visualizador.png"
                                    imgAlt="Botón visualizador"
                                    width={30}
                                    height={30}
                                />
                            </Link>
                        </li>
                    </ul>
                    <ul className="flex justify-center mb-4">
                        <Link href="/auth/acceder">
                            <ButtonImg
                                imgSrc="/salir.png"
                                imgAlt="Botón cerrar sesión"
                                width={30}
                                height={30}
                            />
                        </Link>
                    </ul>
                </nav>
            </SideNav>
            <div className="ml-20 min-h-screen flex-grow overflow-auto">
                {children}
            </div>
        </div>
    );
}
