'use client'

import Input from '../../ui/input'
import Button from '../../ui/button'
import { useForm } from 'react-hook-form'

export default function AgregarProyecto({ toggleNewProjectFormValue }){
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = handleSubmit(data => {
        console.log(data)
    })

    return (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-xl form-width">
                <div className="flex justify-center m-8">
                    <h2 className="text-3xl font-bold">Agregar proyecto</h2>
                </div>
                <form onSubmit={onSubmit}>
                    <label htmlFor="name" className="m-2 text-slate-900 block">Nombre</label>
                    <Input
                        type="text"
                        id="name"
                        className="mb-4"
                        {...register("name", {
                            required: {
                                value: true,
                                message: "El nombre es obligatorio"
                            },
                        })}
                    />
                    {errors.name && (
                        <span className="text-red-500 text-xs">{errors.name.message}</span>
                    )}
                    <label className="m-2 text-slate-900 block">Descripción</label>
                    <textarea className="mb-4 w-full p-4 px-3 py-2 border rounded" rows="4"></textarea>
                    <div className="flex justify-center m-4 space-x-12">
                        <Button
                            className="bg-blue-700 hover:bg-blue-800"
                            children="Guardar"
                        />
                        <Button
                            className="bg-gray-500 hover:bg-gray-600"
                            onClick={toggleNewProjectFormValue}
                            children="Cancelar"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}