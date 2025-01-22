'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Input from '@/app/ui/input';
import Button from '@/app/ui/button';
import { useForm } from 'react-hook-form';

export default function ActualizarInstitucion({ toggleUpdateInstitutionFormValue, getInstitutions, selectedInstitution }) {
    const { register, setValue, handleSubmit, formState: { errors } } = useForm();
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [institutionUpdated, setInstitutionUpdated] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);

    const updateInstitution = handleSubmit(async (data) => {
        try {
            const res = await fetch(`/api/instituciones/${selectedInstitution.id}`, {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const resJSON = await res.json();
            
            if (res.ok) {
                setFeedbackMessage(resJSON.message);
                setInstitutionUpdated(true);
                getInstitutions();
            } else {
                setFeedbackMessage(resJSON.message);
            }
            setShowFeedback(true);
        } catch (error) {
            setFeedbackMessage("Error al conectar con el servidor.");
            setShowFeedback(true);
        }
    });

    useEffect(() => {
        if (selectedInstitution) {
            setValue("name", selectedInstitution.name);
            setValue("active", selectedInstitution.active ? "true" : "false");
        }
    }, [selectedInstitution, setValue]);

    const handleCloseFeedback = () => {
        setShowFeedback(false);
        if (institutionUpdated) {
            toggleUpdateInstitutionFormValue();
            setInstitutionUpdated(false);
        }
    };

    return (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-xl form-width">
                {showFeedback ? (
                    <div className="text-center">
                        <p className="text-2xl font-bold mt-8">{feedbackMessage}</p>
                        {institutionUpdated ? (
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
                            onClick={handleCloseFeedback}
                            children="Aceptar"
                        />
                    </div>
                ) : (
                    <form onSubmit={updateInstitution}>
                        <div className="flex justify-center m-8">
                            <h2 className="text-3xl font-bold">Actualizar institución</h2>
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
                        <label className="m-2 text-slate-900 block">Institución activa:</label>
                        <div className="flex block space-x-8">
                            <div className="flex ml-2">
                                <Input
                                    type="radio"
                                    id="activeYes"
                                    value="true"
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
                                onClick={toggleUpdateInstitutionFormValue}
                                children="Cancelar"
                            />
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
