'use client'

export default function Bitacora(){
    return (
        <div className="h-full p-8">
            <div className="h-full bg-white rounded-md shadow-lg p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-black">Bitácora</h1>
                </div>

                <div className="overflow-auto bg-white rounded-lg shadow-md">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-blue-800 text-white">
                                <th className="p-4">ID</th>
                                <th className="p-4">Usuario</th>
                                <th className="p-4">Pantalla</th>
                                <th className="p-4">Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}