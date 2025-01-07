'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Input from '../../ui/input';
import Button from '../../ui/button';

export default function AgregarInstitucion({ toggleNewInstitutionFormValue, getInstitutions }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [institutionCreated, setInstitutionCreated] = useState(false);
    const [showCreateStatus, setShowCreateStatus] = useState(false);

    const createInstitution = handleSubmit(async data => {
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
                setFeedbackMessage("La institución se ha creado exitosamente.");
                setInstitutionCreated(true);
                getInstitutions();
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
        if (institutionCreated) {
            toggleNewInstitutionFormValue();
            setInstitutionCreated(false);
        }
    };

    return (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-xl form-width">
                {showCreateStatus ? (
                    <div className="text-center">
                        <p className="text-2xl font-bold mt-8">{feedbackMessage}</p>
                        {institutionCreated ? (
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
                    <form onSubmit={createInstitution}>
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
