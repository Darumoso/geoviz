'use client'

import { useState } from 'react';
import Image from 'next/image';
import Button from '@/app/ui/button';

export default function EliminarInstitucion({ toggleDeleteInstitutionMessageValue, getInstitutions, selectedInstitution }){
    const [institutionDeleted, setInstitutionDeleted] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [showDeleteStatus, setShowDeleteStatus] = useState(false);

    const deleteInstitution = async () => {
        try {
            const res = await fetch(`/api/instituciones/${selectedInstitution.id}`, {
                method: "DELETE"
            });
            
            const resJSON = await res.json();
            
            if (res.ok) {
                setFeedbackMessage(resJSON.message)
                setInstitutionDeleted(true);
            } else {
                setFeedbackMessage(resJSON.message);
            }

            setShowDeleteStatus(true);
        } catch (error) {
            console.log(error);
        }
    };

    const closeFeedback = () => {
        setShowDeleteStatus(false);
        if (institutionDeleted) {
            toggleDeleteInstitutionMessageValue();
            setInstitutionDeleted(false);
        }
    };

    return (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-xl form-width">
                {showDeleteStatus ? (
                    <div className="text-center">
                        <p className="text-2xl font-bold mt-8">{feedbackMessage}</p>
                        {institutionDeleted ? (
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
                    <div>
                        <div className="flex flex-col justify-center m-8 items-center">
                            <h1 className="text-3xl text-center font-bold">¿Está seguro que quiere eliminar esta institución?</h1>
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
                                onClick={deleteInstitution}
                            />
                            <Button
                                className="bg-gray-500 hover:bg-gray-600"
                                onClick={toggleDeleteInstitutionMessageValue}
                                children="Cancelar"
                            />
                        </div>
                    </div>
                )}    
            </div>
        </div>
    );
}