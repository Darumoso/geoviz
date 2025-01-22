'use client'

import Input from '@/app/ui/input';
import Button from '@/app/ui/button';
import PopUpMessage from '@/app/ui/popup';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function AgregarProyecto({ toggleNewProjectFormValue, getProjects }){
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [projectCreated, setProjectCreated] = useState(false);
    const [showCreateStatus, setShowCreateStatus] = useState(false);

    const createProject = handleSubmit(async (data) => {
        try {
            const res = await fetch("/api/proyectos", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            
            const resJSON = await res.json()
            
            if (res.ok) {
                setFeedbackMessage(resJSON.message);
                setProjectCreated(true);
                getProjects();
            } else {
                setFeedbackMessage(resJSON.message);
            }
            setShowCreateStatus(true);
        } catch(error) {
            console.log(error);
        }
    });

    const closeFeedback = () => {
        setShowCreateStatus(false);
        if (projectCreated) {
            toggleNewProjectFormValue();
            setProjectCreated(false);
        }
    };

    return (
        <PopUpMessage
            children={
                showCreateStatus ? (
                    <div className="text-center">
                        <p className="text-2xl font-bold mt-8">{feedbackMessage}</p>
                        {projectCreated ? (
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
                <form onSubmit={createProject}>
                    <div className="flex justify-center m-8">
                        <h2 className="text-3xl font-bold">Agregar proyecto</h2>
                    </div>
                    <label htmlFor="name" className="m-2 text-slate-900 block">Nombre:</label>
                    <Input
                        type="text"
                        id="name"
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
                    <label className="m-2 text-slate-900 block">Descripción:</label>
                    <textarea 
                        className="w-full p-4 px-3 py-2 border rounded" rows="4"
                        {...register("description", { 
                            required: {
                                value: true,
                                message: "Debes añadir una descripción"
                            }
                        })}>    
                    </textarea>
                    {errors.description && (
                        <span className="text-red-500 text-xs">{errors.description.message}</span>
                    )}
                    <label className="m-2 text-slate-900 block">Proyecto activo:</label>
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
            )}
        />
    );
}