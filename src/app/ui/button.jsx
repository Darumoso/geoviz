'use client'

export default function Button({ children, className, ...props }) {
    return (
        <button className={`text-white px-4 py-2 font-semibold rounded transition duration-200 ${className}`} {...props}>
            {children}
        </button>
    );
}