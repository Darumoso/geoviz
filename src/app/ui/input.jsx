'use client'

export default function Input({ type, placeholder, value, className, onChange, children}) {
    return (
        <input type={type} placeholder={placeholder} value={value} onChange={onChange}
            className={`w-full p-4 px-3 py-2 border rounded ${className}`}>
            {children}
        </input>
    );
}