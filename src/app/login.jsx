'use client';
import Image from 'next/image';
import Button from './ui/button';
import Input from './ui/input';
import { useForm } from 'react-hook-form';

// Login Page
export default function Login() {
    const { register, formState: { errors } } = useForm();
    return (
        <div className='min-h-screen flex items-center justify-center bg-blue-900'>
            {/* Page name and logo */}
            <div className="flex justify-center items-center absolute top-6 left-4">
                <Image
                    src="/LogoGeoviz.png"
                    className=""
                    alt="Logo"
                    width={120}
                    height={120}
                />
                <span className="text-6xl text-white font-bold">GeoViz</span>
            </div>
            {/* Login form */}
            <div className='bg-white p-10 rounded-lg shadow-lg w-full max-w-md'>
                <form action="">
                <h1 className="font-bold text-center text-3xl ml-4">Inicio de Sesión</h1>
                <label htmlFor="email" className="pt-6 text-slate-500 mb-2 block text-md">
                    Email:
                </label>
                <Input type='email' 
                    placeholder='nombre@correo.com'
                    {...register("email", {
                        required: {
                            value: true,
                            message: "El correo es obligatorio",
                        },
                    })}
                />
                {errors.email && (
                    <span className="text-red-500 text-xs">{errors.email.message}</span>
                )}
                <label
                    htmlFor="password"
                    className="text-slate-500 pt-6 mb-2 block text-md"
                >
                    Contraseña:
                </label>
                <Input 
                    type='password'
                    {...register("password", {
                        required: {
                            value: true,
                            message: "La contraseña es obligatoria",
                        },
                        })}
                />
                {errors.password && (
                    <span className="text-red-500 text-xs">
                    {errors.password.message}
                    </span>
                )}
                </form>
                <div className='pt-6 mt-auto flex justify-center'>
                    <Button 
                        children='Ingresar'
                    />  
                </div>
            </div>
        </div>
    );
}