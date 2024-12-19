'use client'

export default function Button({ children, onClick, className}) {
    return (
        <button className={`text-white px-4 py-2 font-semibold rounded transition duration-200 ${className}`} onClick={onClick}>
            {children}
        </button>
    );
}