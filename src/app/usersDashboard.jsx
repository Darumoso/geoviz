'use client';
import { useState } from "react";

export default function UsersDashboard() {
  return (
    <div className='min-h-screen items-center bg-gray-200'>
        <h1 className='pt-12 text-4xl font-bold mb-6 text-center'>Usuarios registrados</h1>
        <div className='pt-12 overflow-x-auto'>
            <table className='w-3/4 mx-auto bg-white shadow-sm rounded'>
                <thead>
                    <tr>
                        <th className='py-2 px-4 bg-blue-400 text-left text-sm font-semibold'>ID</th>
                        <th className='py-2 px-4 bg-blue-400 text-left text-sm font-semibold'>Nombre</th>
                        <th className='py-2 px-4 bg-blue-400 text-left text-sm font-semibold'>Apellidos</th>
                        <th className='py-2 px-4 bg-blue-400 text-left text-sm font-semibold'>Email</th>
                        <th className='py-2 px-4 bg-blue-400 text-left text-sm font-semibold'>Institución</th>
                        </tr>
                </thead>
                <tbody>
                    {/* ADD THE FUNCTION */}
                    <tr  className='border-t'>
                        <td className='py-2 px-4'>1</td>
                        <td className='py-2 px-4'>Juan</td>
                        <td className='py-2 px-4'>Perez</td>
                        <td className='py-2 px-4'>micorreo@gmail.com</td>
                        <td className='py-2 px-4'>UNAM</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  );
}
