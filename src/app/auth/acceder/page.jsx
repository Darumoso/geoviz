"use client"

import Image from 'next/image';
import Button from '../../ui/button';
import Input from '../../ui/input';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();

    const login = handleSubmit(async (data) => {
        const res = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false
        })
        if (res.ok) {
            router.push("/dashboard");
        }
    })

    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-900">
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
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
                <form onSubmit={login}>
                    <h1 className="font-bold text-center text-3xl ml-4">Inicio de sesión</h1>
                    <label 
                        htmlFor="email" 
                        className="pt-6 text-slate-900 m-2 block text-md">
                            Email:
                    </label>
                    <Input
                        type="email"
                        id="email"
                        placeholder="usuario@email.com"
                        {...register("email", {
                            required: {
                                value: true,
                                message: "El email es obligatorio",
                            },
                        })}
                    />
                    {errors.email && (
                        <span className="text-red-500 text-xs">{errors.email.message}</span>
                    )}
                    <label
                        htmlFor="password"
                        className="text-slate-900 m-2 block text-md"
                    >
                        Contraseña:
                    </label>
                    <Input 
                        type="password"
                        id="password"
                        placeholder="**********"
                        {...register("password", {
                            required: {
                                value: true,
                                message: "La contraseña es obligatoria",
                            },
                        })}
                    />
                    {errors.password && (
                        <span className="text-red-500 text-xs">{errors.password.message}</span>
                    )}
                    <div className="pt-6 mt-auto flex justify-center">
                        <Button 
                            className="bg-blue-500 hover:bg-blue-600"
                            children="Ingresar"
                        />  
                    </div>
                </form>
            </div>
        </div>
    );
}