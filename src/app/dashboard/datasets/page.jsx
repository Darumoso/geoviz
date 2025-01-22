'use client'

import { useState } from "react";
import Button from "@/app/ui/button";
import AgregarDataset from "./agregarDataset";

export default function Datasets(){
    const [newDatasetForm, setNewDatasetForm] = useState(false);
    
    const toggleNewDatasetFormValue = () => {
        setNewDatasetForm(!newDatasetForm);
    };

    return (
        <div className="h-full p-8 overflow-hidden">
            {newDatasetForm && (
                <AgregarDataset 
                    toggleNewDatasetFormValue={toggleNewDatasetFormValue}
                />
            )}

            <div className="h-full bg-white rounded-md shadow-lg p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-black">Datasets</h1>
                    <Button
                        className="px-4 bg-blue-700 hover:bg-blue-800"
                        children="Agregar geoJSON"
                        onClick={toggleNewDatasetFormValue}
                    />
                </div>

                <div className="overflow-auto bg-white rounded-lg shadow-md">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-blue-800 text-white">
                                <th className="p-4">ID</th>
                                <th className="p-4">Proyecto</th>
                                <th className="p-4">Dataset</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}