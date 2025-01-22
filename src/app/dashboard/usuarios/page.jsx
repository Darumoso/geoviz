'use client'

import { useState, useEffect } from 'react';
import Button from '@/app/ui/button';
import Input from '@/app/ui/input';
import ButtonImg from '@/app/ui/imgbutton';
import ActualizarUsuario from './actualizarUsuario';
import EliminarUsuario from './eliminarUsuario';
import AgregarUsuario from './agregarUsuario';

export default function Usuarios() {
    const [userToSearch, setUserToSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [newUserForm, setNewUserForm] = useState(false);
    const [updateUserForm, setUpdateUserForm] = useState(false);
    const [deleteUserMessage, setDeleteUserMessage] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const getUsers = async () => {
        try {
            const res = await fetch("/api/usuarios", {
                method: "GET"
            }); 
            if (!res.ok) throw new Error("Error al obtener a los usuarios");
            const usuarios = await res.json();
            setUsers(usuarios);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUsers();
    },[]);

    const searchUser = (e) => {
        setUserToSearch(e.target.value);
    };

    const toggleNewUserFormValue = () => {
        setNewUserForm(!newUserForm);
    };

    const toggleUpdateUserFormValue = () => {
        setUpdateUserForm(!updateUserForm);
    };

    const toggleDeleteUserMessageValue = () => {
        setDeleteUserMessage(!deleteUserMessage);
    }

    const updateUser = (user) => {
        toggleUpdateUserFormValue();
        setSelectedUser(user);
    }

    const deleteUser = (user) => {
        toggleDeleteUserMessageValue();
        setSelectedUser(user);
    };

    return (
        <div className="h-full p-8 overflow-hidden">
            {/* Mostrar el formulario para agregar un usuario*/}
            {newUserForm && (
                <AgregarUsuario 
                    toggleNewUserFormValue={toggleNewUserFormValue}
                    getUsers={getUsers}
                />
            )}

            {/* Mostrar el formulario para actualizar un usuario*/}
            {updateUserForm && (
                <ActualizarUsuario 
                    toggleUpdateUserFormValue={toggleUpdateUserFormValue}
                    getUsers={getUsers}
                    selectedUser={selectedUser}
                />
            )}

            {/* Mostrar confirmación para eliminar un usuario*/}
            {deleteUserMessage && (
                <EliminarUsuario 
                    toggleDeleteUserMessageValue={toggleDeleteUserMessageValue}
                    getUsers={getUsers}
                    selectedUser={selectedUser}
                />
            )}

            <div className="h-full bg-white rounded-md shadow-lg p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-black">Usuarios registrados</h1>
                    <Button
                        className="px-4 bg-blue-700 hover:bg-blue-800"
                        children="Agregar usuario"
                        onClick={toggleNewUserFormValue}
                    />
                </div>

                <div className="mb-8">
                    <Input
                        type="text"
                        placeholder="Buscar usuario por nombre"
                        value={userToSearch}
                        onChange={searchUser}
                    />
                </div>
                {users.length > 0 ? (
                    <div className="overflow-auto flex-grow bg-white rounded-lg shadow-md">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-blue-800 text-white">
                                    <th className="p-4">ID</th>
                                    <th className="p-4">Nombre</th>
                                    <th className="p-4">Correo electrónico</th>
                                    <th className="p-4">Teléfono</th>
                                    <th className="p-4">Institución</th>
                                    <th className="p-4">Proyectos</th>
                                    <th className="p-4">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Buscar por nombre */}
                                {users
                                    .filter((user) =>
                                        `${user.firstName} ${user.lastName}`.toLowerCase().includes(userToSearch.toLowerCase()) ||
                                        user.firstName.toLowerCase().includes(userToSearch.toLowerCase()) ||
                                        user.lastName.toLowerCase().includes(userToSearch.toLowerCase())
                                    )
                                    .map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50">
                                            <td className="p-2 border w-32">{user.id}</td>
                                            <td className="p-2 border">{`${user.firstName} ${user.lastName}`}</td>
                                            <td className="p-2 border">{user.email}</td>
                                            <td className="p-2 border">{user.phone}</td>
                                            <td className="p-2 border">{user.Institucion.name}</td>
                                            <td className="p-2 border">{user.project}</td>
                                            <td className="p-2 border w-32">
                                                <div className="flex-grow flex justify-center items-center space-x-4">
                                                    <ButtonImg
                                                        imgSrc="/editar.png"
                                                        imgAlt="Ícono editar"
                                                        className="bg-yellow-400 hover:bg-yellow-500"
                                                        onClick={() => updateUser(user)}
                                                        width={25}
                                                        height={25}
                                                    />
                                                    <ButtonImg
                                                        imgSrc="/eliminar.png"
                                                        imgAlt="Ícono editar"
                                                        className="bg-red-500 hover:bg-red-600"
                                                        onClick={() => deleteUser(user)}
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
                        <p className="text-lg font-bold">No hay usuarios registrados.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
