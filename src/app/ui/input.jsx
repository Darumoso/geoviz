'use client';

export default function Input({ type, placeholder, onChange, value, className, children}) {
    return (
        <input type={type} placeholder={placeholder} onChange={onChange} value={value}
            className={`w-full p-4 px-3 py-2 border rounded ${className}`}>
            {children}
        </input>
    );
}