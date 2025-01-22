'use client'

export default function PopUpMessage({ children }) {
    return (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-xl form-width">
                {children}
            </div>
        </div>
    );
}