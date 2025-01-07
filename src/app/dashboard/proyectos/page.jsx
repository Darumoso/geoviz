'use client'

import { useState } from 'react'
import Input from '../../ui/input';
import Button from '../../ui/button';
import AgregarProyecto from './agregarProyecto';

export default function Proyectos(){
    const [searchTerm, setSearchTerm] = useState('');
    const [project, setProjects] = useState([]);
    const [newProjectForm, setNewProjectForm] = useState(false);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const toggleNewProjectFormValue = () => {
        setNewProjectForm(!newProjectForm);
    };

    return (
        <div className="h-full p-8 overflow-hidden">
            {/* Mostrar el formulario para agregar un usuario*/}
            {newProjectForm && (
                <AgregarProyecto toggleNewProjectFormValue={toggleNewProjectFormValue}/>
            )}

            <div className="h-full bg-white rounded-md shadow-lg p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-black">Proyectos registrados</h1>
                    <Button
                        className="px-4 bg-blue-700 hover:bg-blue-800"
                        children="Agregar proyecto"
                        onClick={toggleNewProjectFormValue}
                    />
                </div>

                <div className="mb-8">
                    <Input
                        type="text"
                        placeholder="Buscar proyecto por nombre"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                <div className="overflow-auto flex-grow bg-white rounded-lg shadow-md">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-blue-800 text-white">
                                <th className="p-4">ID</th>
                                <th className="p-4">Nombre</th>
                                <th className="p-4">Descripción</th>
                                <th className="p-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Buscar por nombre */}
                            {project
                                .filter((project) =>
                                    project.name.toLowerCase().includes(searchTerm.toLowerCase())
                                )
                                .map((project) => (
                                    <tr key={project.id} className="hover:bg-gray-50">
                                        <td className="p-2 border">{project.id}</td>
                                        <td className="p-2 border">{project.name}</td>
                                        <td className="p-2 border">{project.description}</td>
                                        <td className="p-2 border">
                                            <div className="flex-grow flex justify-center items-center space-x-10">
                                                <ButtonImg
                                                    imgSrc="/editar.png"
                                                    imgAlt="Ícono editar"
                                                    className="bg-yellow-400 hover:bg-yellow-500"
                                                    width={25}
                                                    height={25}
                                                />
                                                <ButtonImg
                                                    imgSrc="/eliminar.png"
                                                    imgAlt="Ícono editar"
                                                    className="bg-red-500 hover:bg-red-600"
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
            </div>
        </div>
    );
}