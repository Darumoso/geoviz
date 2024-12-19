'use client'

import Input from '../../ui/input'
import Button from '../../ui/button';

export default function CrearUsuario({ toggleNewUserFormValue }){
    return (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-xl w-96">
                <div className="flex justify-center m-8">
                    <h2 className="text-3xl font-bold">Agregar usuario</h2>
                </div>
                <form>
                    <label className="p-4">Nombre(s)</label>
                    <Input
                        type="text"
                        className="mb-4"
                    />
                    <label className="m-4">Apellidos</label>
                    <Input
                        type="text"
                        className="mb-4"
                    />
                    <label className="m-4">Correo electrónico</label>
                    <Input
                        type="email"
                        className="mb-4"
                    />
                    <label className="m-4">Institución</label>
                    <Input
                        type="text"
                        className="mb-4"
                    />
                    <label className="m-4">Proyectos</label>
                    <Input
                        type="text"
                        className="mb-4"
                    />
                    <div className="flex justify-center m-4 space-x-12">
                        <Button
                            className="bg-blue-700 hover:bg-blue-800"
                            children="Guardar"
                        />
                        <Button
                            className="bg-gray-500 hover:bg-gray-600"
                            onClick={toggleNewUserFormValue}
                            children="Cancelar"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}