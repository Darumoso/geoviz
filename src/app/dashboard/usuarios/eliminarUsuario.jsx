'use client'

import Image from 'next/image'
import Button from '../../ui/button'

export default function EliminarUsuario({ toggleDeleteUserMessageValue }){
    return (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-xl w-96">
                <div className="flex flex-col justify-center m-8 items-center">
                    <h1 className="text-3xl text-center font-bold">¿Está seguro que quiere eliminar al usuario?</h1>
                    <Image
                        src="/advertencia.png"
                        alt="Ícono advertencia"
                        width={180}
                        height={180}
                        className="m-4"
                    />
                </div>
                <div className="flex justify-center m-4 space-x-12">
                    <Button
                        className="bg-red-500 hover:bg-red-600"
                        children="Eliminar"
                    />
                    <Button
                        className="bg-gray-500 hover:bg-gray-600"
                        onClick={toggleDeleteUserMessageValue}
                        children="Cancelar"
                    />
                </div>
            </div>
        </div>
    );
}