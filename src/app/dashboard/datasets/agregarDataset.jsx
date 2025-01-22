'use client'

import Input from '@/app/ui/input';
import Button from '@/app/ui/button';
import PopUpMessage from '@/app/ui/popup';
import ProgressBar from '@/app/ui/progressBar';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function AgregarDataset({ toggleNewDatasetFormValue }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [datasetCreated, setDatasetCreated] = useState(false);
    const [showCreateStatus, setShowCreateStatus] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const createDataset = handleSubmit(async (data) => {
        try {
            const formData = new FormData();
            
            if (data.geoJSON[0]) {
                formData.append("geoJSON", data.geoJSON[0]);
            }
    
            console.log(formData); 
    
            const res = await axios.post("/api/datasets", formData, {
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                }
            });
    
            const resJSON = res.data;
    
            if (res.status === 200) { 
                setFeedbackMessage(resJSON.message);
                setDatasetCreated(true);
            } else {
                setFeedbackMessage(resJSON.message);
            }
            setShowCreateStatus(true);
        } catch (error) {
            console.error(error);
            setFeedbackMessage("Hubo un error al procesar el archivo.");
            setShowCreateStatus(true);
        }
    });

    const closeFeedback = () => {
        setShowCreateStatus(false);
        if (datasetCreated) {
            toggleNewDatasetFormValue();
            setDatasetCreated(false);
        }
    };

    return (
        <PopUpMessage
            children={showCreateStatus ? (
                <div className="text-center">
                    <p className="text-2xl font-bold mt-8">{feedbackMessage}</p>
                    {datasetCreated ? (
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
                <form onSubmit={createDataset}>
                    <div className="flex justify-center m-8">
                        <h2 className="text-3xl font-bold">Agregar dataset</h2>
                    </div>
                    <label htmlFor="geo" className="m-2 text-slate-900 block">geoJSON:</label>
                    <Input
                        type="file"
                        id="geo"
                        accept=".geojson"
                        {...register("geoJSON", {
                            required: {
                                value: true,
                                message: "El archivo es obligatorio"
                            }
                        })}
                    />
                    {errors.geoJSON && (
                        <span className="text-red-500 text-xs">{errors.geoJSON.message}</span>
                    )}

                    {/* Progress bar */}
                    {uploadProgress > 0 && (
                        <div className="mt-4">
                            <ProgressBar progress={uploadProgress} />
                        </div>
                    )}
                    <div className="flex justify-center m-4 space-x-12">
                        <Button
                            className="bg-blue-700 hover:bg-blue-800"
                            children="Guardar"
                        />
                        <Button
                            className="bg-gray-500 hover:bg-gray-600"
                            onClick={toggleNewDatasetFormValue}
                            children="Cancelar"
                        />
                    </div>
                </form>
            )}
        />
    );
}