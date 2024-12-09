"use client"
import Image from 'next/image'
import Button from '@/app/ui/button';
import Input from '@/app/ui/input';
import { useForm } from 'react-hook-form'

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
      /*<div className="h-[calc(100vh-7rem)] flex justify-center items-center">
        <div className="flex justify-center items-center absolute top-6 left-4">
          <Image
            src="/LogoGeoviz.png"
            className=""
            alt="Logo"
            width={100}
            height={100}
          />
          <span className="text-5xl font-bold">GeoViz</span>
        </div>
        <form action="">
          <h1 className="font-bold text-4xl ml-4">Inicio de Sesión</h1>
          <label htmlFor="email" className="text-slate-500 mb-2 block text-sm">
            Email:
          </label>
          <input
            type="email"
            {...register("email", {
              required: {
                value: true,
                message: "El correo es obligatorio",
              },
            })}
            className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
            placeholder="nombre@correo.com"
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}
          <label
            htmlFor="password"
            className="text-slate-500 mb-2 block text-sm"
          >
            Contraseña
          </label>
          <input
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: "La contraseña es obligatoria",
              },
            })}
            className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
            placeholder="nombre@correo.com"
          />
          {errors.password && (
            <span className="text-red-500 text-xs">
              {errors.password.message}
            </span>
          )}
        </form>
      </div>*/

      /*<div className='absolute top-10 left-12 text-white text-6xl font-bold flex items-center'>
                <Image src='/LogoGeoviz.png' className="w-32 h-32 mr-4 object-contain" alt="Logo" width={100} height={1}/>
                GEOVIZ
            </div>
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
            </div>*/
    );
}
