'use client';

import { useState } from 'react';
import Image from 'next/image';
import Input from '../../ui/input';
import Button from '../../ui/button';
import { useForm } from 'react-hook-form';

export default function ActualizarInstitucion({ toggleNewInstitutionFormValue, getInstitutions }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [institutionUpdated, setInstitutionUpdated] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);

    const onSubmit = handleSubmit(async data => {
        try {
            const res = await fetch("/api/instituciones", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const resJSON = await res.json();
            
            if (res.ok) {
                setFeedbackMessage("La institución se ha actualizado exitosamente.");
                setInstitutionCreated(true);
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

    const handleCloseFeedback = () => {
        setShowFeedback(false);
        if (feedbackMessage === "La institución se ha actualizado exitosamente.") {
            toggleNewInstitutionFormValue();
            setInstitutionCreated(false);
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
                                    src="/advertencia.png"
                                    alt="Ícono advertencia"
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
                    <form onSubmit={onSubmit}>
                        <div className="flex justify-center m-8">
                            <h2 className="text-3xl font-bold">Agregar institución</h2>
                        </div>
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
                        <div className="flex justify-center m-4 space-x-12">
                            <Button
                                className="bg-blue-700 hover:bg-blue-800"
                                children="Guardar"
                            />
                            <Button
                                className="bg-gray-500 hover:bg-gray-600"
                                onClick={toggleNewInstitutionFormValue}
                                children="Cancelar"
                            />
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
