'use client';

export default function Button({ onClick, children, className}) {
    return (
        <button onClick={onClick} className={`w-4/12 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200 ${className}`}>
            {children}
        </button>
    );
}