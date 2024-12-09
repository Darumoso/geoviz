'use client';
import { useState } from 'react';
import Button from './ui/button';
import Input from './ui/input';

// Login Page
export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [viewPassword, setViewPassword] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = () => {
        
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-blue-900'>
            {/* Page name and logo */}
            <div className='absolute top-10 left-12 text-white text-6xl font-bold flex items-center'>
                <img src='/LogoGeoviz.png" alt="Logo" className="w-32 h-32 mr-4 object-contain'/>
                GEOVIZ
            </div>
            {/* Login form */}
            <div className='bg-white p-10 rounded-lg shadow-lg w-full max-w-md'>
                <h2 className='text-center text-2xl font-bold mb-4'>BIENVENIDO</h2>
                <div className='mb-4'>
                    <label className='block text-gray-700 p-4'>Usuario</label>
                    <Input 
                        type='text'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 p-4'>Contraseña</label>
                    <div className='relative'>
                        <Input 
                            type='password'
                        />
                    </div>
                </div>
                <div className='p-4 mt-auto flex justify-center'>
                    <Button 
                        children='Ingresar'
                    />  
                </div>
            </div>
        </div>
    );
}