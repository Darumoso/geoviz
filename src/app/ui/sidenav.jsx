'use client'

import Link from 'next/link'
import Image from 'next/image'
import ButtonImg from '../ui/imgbutton'

export default function SideNav() {
    return (
        <div className="relative w-18 flex min-h-screen rounded-lg flex-col bg-blue-900">
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
            <nav className="flex-grow">
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
            </nav>
        </div>
    );
}
