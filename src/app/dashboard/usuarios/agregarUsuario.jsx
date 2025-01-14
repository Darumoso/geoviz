'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Input from '../../ui/input';
import Button from '../../ui/button';
import { useForm } from 'react-hook-form';

export default function AgregarUsuario({ toggleNewUserFormValue, getUsers }){
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [institutions, setInstitutions] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [userCreated, setUserCreated] = useState(false);
    const [showCreateStatus, setShowCreateStatus] = useState(false);

    const getInstitutions = async () => {
        try {
            const res = await fetch("/api/instituciones", {
                method: "GET"
            }); 
            if (!res.ok) throw new Error("Error al obtener instituciones");
            const instituciones = await res.json();
            setInstitutions(instituciones.filter((institucion) => institucion.active === true));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getInstitutions();
    }, []);

    const createUser = handleSubmit(async (data) => {
        try {
            const res = await fetch("/api/usuarios", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            
            const resJSON = await res.json()

            if (res.ok) {
                setFeedbackMessage(resJSON.message);
                setUserCreated(true);
                getUsers();
            } else {
                setFeedbackMessage(resJSON.message);
            }
            setShowCreateStatus(true);
        } catch (error) {
            console.log(error);
        }
    });

    const closeFeedback = () => {
        setShowCreateStatus(false);
        if (userCreated) {
            toggleNewUserFormValue();
            setUserCreated(false);
        }
    };
    
    return (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-xl form-width">
                {showCreateStatus ? (
                    <div className="text-center">
                        <p className="text-2xl font-bold mt-8">{feedbackMessage}</p>
                        {userCreated ? (
                            <div className="flex justify-center">
                                <Image
                                    src="/correcto.png"
                                    alt="Ícono éxito"
                                    width={180}
                                    height={180}
                                    className="m-4"
                                />
                            </div>
                        ) : (
                            <div className="flex justify-center">
                                <Image
                                    src="/error.png"
                                    alt="Ícono error"
                                    width={180}
                                    height={180}
                                    className="m-4"
                                />
                            </div>
                        )}
                        <Button
                            className="m-4 bg-blue-700 hover:bg-blue-800"
                            onClick={closeFeedback}
                            children="Aceptar"
                        />
                    </div>
                ) : (
                    <form onSubmit={createUser}>
                        <div className="flex justify-center m-8">
                            <h2 className="text-3xl font-bold">Agregar usuario</h2>
                        </div>
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
                        <label className="m-2 text-slate-900 block">Usuario activo:</label>
                        <div className="flex block space-x-8">
                            <div className="flex ml-2">
                                <Input
                                    type="radio"
                                    id="activeYes"
                                    value="true"
                                    defaultChecked
                                    {...register("active", {
                                        required: {
                                            value: true,
                                            message: "Debes elegir una opción",
                                        },
                                    })}
                                />
                                <label htmlFor="activeYes" className="ml-2 text-slate-900">Sí</label>
                            </div>
                            <div className="flex">
                                <Input
                                    type="radio"
                                    id="activeNo"
                                    value="false"
                                    {...register("active", {
                                        required: {
                                            value: true,
                                            message: "Debes elegir una opción",
                                        },
                                    })}
                                />
                                <label htmlFor="activeNo" className="ml-2 text-slate-900">No</label>
                            </div>
                        </div>
                        {errors.active && (
                            <span className="text-red-500 text-xs">{errors.active.message}</span>
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
                        <select 
                            className="p-2 border rounded w-full" 
                            name="institution" 
                            id="institution"
                            {...register("institution", { 
                                required: {
                                    value: true,
                                    message: "Debes elegir una institución"
                                }
                            })}
                            onChange={(e) => setValue("institution", e.target.value)}
                        >
                            <option value=""> - </option>
                            {institutions.map((institution) => (
                                <option key={institution.id} value={institution.id}>
                                    {institution.name}
                                </option>
                            ))}
                        </select>
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
                                    id="isAdminYes"
                                    {...register("isAdmin", {
                                        required: {
                                            value: true,
                                            message: "Debes elegir una opción",
                                        },
                                    })}
                                />
                                <label htmlFor="isAdminYes" className="ml-2 text-slate-900">Sí</label>
                            </div>
                            <div className="flex">
                                <Input
                                    type="radio"
                                    id="isAdminNo"
                                    value="false"
                                    {...register("isAdmin", {
                                        required: {
                                            value: true,
                                            message: "Debes elegir una opción",
                                        },
                                    })}
                                />
                                <label htmlFor="isAdminNo" className="ml-2 text-slate-900">No</label>
                            </div>
                        </div>
                        {errors.isAdmin && (
                            <span className="text-red-500 text-xs">{errors.isAdmin.message}</span>
                        )}
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
                )}
            </div>
        </div>
    );
}