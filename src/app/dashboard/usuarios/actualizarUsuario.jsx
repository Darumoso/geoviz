'use client'

import Input from '../../ui/input'
import Button from '../../ui/button'
import { useForm } from 'react-hook-form'

export default function ActualizarUsuario({ toggleUpdateUserFormValue }){
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = handleSubmit(data => {
        console.log(data)
    })

    return (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-xl form-width">
                <div className="flex justify-center m-8">
                    <h2 className="text-3xl font-bold">Actualizar usuario</h2>
                </div>
                <form onSubmit={onSubmit}>
                    <label htmlFor="firstName" className="m-2 text-slate-900 block">Nombre(s):</label>
                    <Input
                        type="text"
                        id="firstName"
                        {...register("firstName", {
                            required: {
                                value: true,
                                message: "El nombre es obligatorio",
                            },
                        })}
                    />
                    {errors.firstName && (
                        <span className="text-red-500 text-xs">{errors.firstName.message}</span>
                    )}
                    <label htmlFor="lastName" className="m-2 text-slate-900 block">Apellidos:</label>
                    <Input
                        type="text"
                        id="lastName"
                        {...register("lastName", {
                            required: {
                                value: true,
                                message: "Los apellidos son obligatorios",
                            },
                        })}
                    />
                    {errors.lastName && (
                        <span className="text-red-500 text-xs">{errors.lastName.message}</span>
                    )}
                    <label htmlFor="email" className="m-2 text-slate-900 block">Correo electrónico:</label>
                    <Input
                        type="email"
                        id="email"
                        placeholder="usuario@email.com"
                        {...register("email", {
                            required: {
                                value: true,
                                message: "El email es obligatorio",
                            },
                        })}
                    />
                    {errors.email && (
                        <span className="text-red-500 text-xs">{errors.email.message}</span>
                    )}
                    <label htmlFor="phone" className="m-2 text-slate-900 block">Teléfono:</label>
                    <Input
                        type="text"
                        id="phone"
                        placeholder="1234567890"
                        {...register("phone", {
                            required: {
                                maxLength: 10,
                                value: false,
                            },
                        })}
                    />
                    <label htmlFor="institution" className="m-2 text-slate-900 block">Institución:</label>
                    <Input
                        type="text"
                        id="institution"
                        {...register("institution", {
                            required: {
                                value: true,
                                message: "La institución es obligatoria",
                            },
                        })}
                    />
                    {errors.institution && (
                        <span className="text-red-500 text-xs">{errors.institution.message}</span>
                    )}
                    <label htmlFor="project" className="m-2 text-slate-900 block">Proyecto(s):</label>
                    <Input
                        type="text"
                        id="project"
                        {...register("project", {
                            required: {
                                value: true,
                                message: "El proyecto es obligatorio",
                            },
                        })}
                    />
                    {errors.project && (
                        <span className="text-red-500 text-xs">{errors.project.message}</span>
                    )}
                    <label className="m-2 text-slate-900 block">Es administrador:</label>
                    <div className="flex block space-x-8">
                        <div className="flex ml-2">
                            <Input
                                type="radio"
                                value="true"
                                id="administratorYes"
                                {...register("administrator", {
                                    required: {
                                        value: true,
                                        message: "Debes elegir una opción",
                                    },
                                })}
                            />
                            <label htmlFor="administratorYes" className="ml-2 text-slate-900">Sí</label>
                        </div>
                        <div className="flex">
                            <Input
                                type="radio"
                                id="administratorNo"
                                value="false"
                                {...register("administrator", {
                                    required: {
                                        value: true,
                                        message: "Debes elegir una opción",
                                    },
                                })}
                            />
                            <label htmlFor="administratorNo" className="ml-2 text-slate-900">No</label>
                        </div>
                    </div>
                    {errors.administrator && (
                        <span className="text-red-500 text-xs">{errors.administrator.message}</span>
                    )}
                    <div className="flex justify-center m-4 space-x-12">
                        <Button
                            className="bg-blue-700 hover:bg-blue-800"
                            children="Actualizar"
                        />
                        <Button
                            className="bg-gray-500 hover:bg-gray-600"
                            onClick={toggleUpdateUserFormValue}
                            children="Cancelar"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}