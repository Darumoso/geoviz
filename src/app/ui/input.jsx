'use client'

export default function Input({ type, id, accept, placeholder, className, ref, ...props }) {
    return (
        <input
            type={type}
            id={id}
            accept={accept}
            placeholder={placeholder}
            ref={ref}
            className={`w-full p-4 px-3 py-2 border rounded ${className}`}
            {...props}
        />
    );
}
