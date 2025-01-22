'use client'

import { useState, useEffect } from 'react'
import Input from '@/app/ui/input';
import ButtonImg from '@/app/ui/imgbutton';
import Button from '@/app/ui/button';
import AgregarInstitucion from './agregarInstitucion';
import ActualizarInstitucion from './actualizarInstitucion';

export default function Instituciones(){
    const [institutionToSearch, setInstitutionToSearch] = useState('');
    const [institutions, setInstitutions] = useState([]);
    const [newInstitutionForm, setNewInstitutionForm] = useState(false);
    const [updateInstitutionForm, setUpdateInstitutionForm] = useState(false);
    const [selectedInstitution, setSelectedInstitution] = useState(null);

    const getInstitutions = async () => {
        try {
            const res = await fetch("/api/instituciones", {
                method: "GET"
            }); 
            if (!res.ok) throw new Error("Error al obtener instituciones");
            const institutions = await res.json();
            setInstitutions(institutions);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getInstitutions();
    }, []);

    const searchInstitution = (e) => {
        setInstitutionToSearch(e.target.value);
    };

    const toggleNewInstitutionFormValue = () => {
        setNewInstitutionForm(!newInstitutionForm);
    };

    const toggleUpdateInstitutionFormValue = () => {
        setUpdateInstitutionForm(!updateInstitutionForm)
    };

    const updateInstitution = (institution) => {
        toggleUpdateInstitutionFormValue();
        setSelectedInstitution(institution);
    };

    return (
        <div className="h-full p-8 overflow-hidden">
            {/* Mostrar el formulario para agregar una institución*/}
            {newInstitutionForm && (
                <AgregarInstitucion 
                    toggleNewInstitutionFormValue={toggleNewInstitutionFormValue} 
                    getInstitutions={getInstitutions}
                />
            )}

            {/* Mostrar el formulario para actualizar una institución */}
            {updateInstitutionForm && (
                <ActualizarInstitucion
                    toggleUpdateInstitutionFormValue={toggleUpdateInstitutionFormValue}
                    getInstitutions={getInstitutions}
                    selectedInstitution={selectedInstitution}
                />
            )}

            <div className="h-full bg-white rounded-md shadow-lg p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-black">Instituciones registradas</h1>
                    <Button
                        className="px-4 bg-blue-700 hover:bg-blue-800"
                        children="Agregar institución"
                        onClick={toggleNewInstitutionFormValue}
                    />
                </div>

                <div className="mb-8">
                    <Input
                        type="text"
                        placeholder="Buscar institución por nombre"
                        value={institutionToSearch}
                        onChange={searchInstitution}
                    />
                </div>
                {institutions.length > 0 ? (
                    <div className="overflow-auto flex-grow bg-white rounded-lg shadow-md">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-blue-800 text-white">
                                    <th className="p-4">ID</th>
                                    <th className="p-4">Nombre</th>
                                    <th className="p-4">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Buscar por nombre */}
                                {institutions
                                    .filter((institution) =>
                                        institution.name.toLowerCase().includes(institutionToSearch.toLowerCase())
                                    )
                                    .map((institution) => (
                                        <tr key={institution.id} className="hover:bg-gray-50">
                                            <td className="p-2 border w-32">{institution.id}</td>
                                            <td className="p-2 border">{institution.name}</td>
                                            <td className="p-2 border w-20">
                                                <div className="flex-grow flex justify-center items-center space-x-4">
                                                    <ButtonImg
                                                        imgSrc="/editar.png"
                                                        imgAlt="Ícono editar"
                                                        className="bg-yellow-400 hover:bg-yellow-500"
                                                        onClick={() => updateInstitution(institution)}
                                                        width={25}
                                                        height={25}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="text-lg font-bold">No hay instituciones registradas.</p>
                    </div>
                )}
            </div>
        </div>
    );
}