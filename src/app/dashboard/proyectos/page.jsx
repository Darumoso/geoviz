'use client'

import { useState, useEffect } from 'react'
import Input from '@/app/ui/input';
import Button from '@/app/ui/button';
import ButtonImg from '@/app/ui/imgbutton';
import AgregarProyecto from './agregarProyecto';
import ActualizarProyecto from './actualizarProyecto';
import EliminarProyecto from './eliminarProyecto';

export default function Proyectos(){
    const [projectToSearch, setProjectToSearch] = useState('');
    const [projects, setProjects] = useState([]);
    const [newProjectForm, setNewProjectForm] = useState(false);
    const [updateProjectForm, setUpdateProjectForm] = useState(false);
    const [deleteProjectMessage, setDeleteProjectMessage] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const getProjects = async () => {
        try {
            const res = await fetch("/api/proyectos", {
                method: "GET"
            }); 
            if (!res.ok) throw new Error("Error al obtener los proyectos.");
            const projects = await res.json();
            setProjects(projects);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProjects();
    }, []);

    const searchProject = (e) => {
        setProjectToSearch(e.target.value);
    };

    const toggleNewProjectFormValue = () => {
        setNewProjectForm(!newProjectForm);
    };

    const toggleUpdateProjectFormValue = () => {
        setUpdateProjectForm(!updateProjectForm);
    };

    const toggleDeleteProjectMessageValue = () => {
        setDeleteProjectMessage(!deleteProjectMessage);
    }

    const updateProject = (project) => {
        toggleUpdateProjectFormValue();
        setSelectedProject(project);
    }

    const deleteProject = (project) => {
        toggleDeleteProjectMessageValue();
        setSelectedProject(project);
    };

    return (
        <div className="h-full p-8 overflow-hidden">
            {newProjectForm && (
                <AgregarProyecto 
                    toggleNewProjectFormValue={toggleNewProjectFormValue}
                    getProjects={getProjects}
                />
            )}

            {updateProjectForm && (
                <ActualizarProyecto 
                    toggleUpdateProjectFormValue={toggleUpdateProjectFormValue}
                    getProjects={getProjects}
                    selectedProject={selectedProject}
                />
            )}

            {deleteProjectMessage && (
                <EliminarProyecto
                    toggleDeleteProjectMessageValue={toggleDeleteProjectMessageValue}
                    getProjects={getProjects}
                    selectedProject={selectedProject}
                />
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
                        value={projectToSearch}
                        onChange={searchProject}
                    />
                </div>
                {projects.length > 0 ? (
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
                                {projects
                                    .filter((project) =>
                                        project.name.toLowerCase().includes(projectToSearch.toLowerCase())
                                    )
                                    .map((project) => (
                                        <tr key={project.id} className="hover:bg-gray-50">
                                            <td className="p-2 border">{project.id}</td>
                                            <td className="p-2 border">{project.name}</td>
                                            <td className="p-2 border">{project.description}</td>
                                            <td className="p-2 border w-32">
                                                <div className="flex-grow flex justify-center items-center space-x-4">
                                                    <ButtonImg
                                                        imgSrc="/editar.png"
                                                        imgAlt="Ícono editar"
                                                        className="bg-yellow-400 hover:bg-yellow-500"
                                                        onClick={() => updateProject(project)}
                                                        width={25}
                                                        height={25}
                                                    />
                                                    <ButtonImg
                                                        imgSrc="/eliminar.png"
                                                        imgAlt="Ícono editar"
                                                        className="bg-red-500 hover:bg-red-600"
                                                        onClick={() => deleteProject(project)}
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
                        <p className="text-lg font-bold">No hay proyectos registrados.</p>
                    </div>
                )}
            </div>
        </div>
    );
}