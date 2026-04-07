import React from "react";

const getChoferName = (exception, travel) => {
  if (travel.user) return `${travel.user.nombres} ${travel.user.apellidos}`;
  if (exception.rol?.user) return `${exception.rol.user.nombres} ${exception.rol.user.apellidos}`;
  if (exception.chofer_id) return `ID: ${exception.chofer_id}`;
  return "Desconocido";
};

export default function ListException({ entitie, exceptions, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        <h2 className="text-xl font-semibold mb-4 text-center">
         Lista de Excepciones de {entitie.chofer || "Desconocido"}
        </h2>

        <table className="min-w-full text-sm border-collapse border border-gray-200">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-3 py-2 border">ID</th>
              <th className="px-3 py-2 border">Chofer</th>
              <th className="px-3 py-2 border">Tipo</th>
              <th className="px-3 py-2 border">Lugar</th>
              <th className="px-3 py-2 border">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {exceptions.length > 0 ? (
              exceptions.map((exception, index) => (
                <tr key={exception.id} className="hover:bg-gray-50">
                  {/* Muestra un contador empezando desde 1 */}
                  <td className="px-3 py-2 border text-center">{index + 1}</td>  
                  {/* Muestra el nombre del chofer usando tu función */}
                  <td className="px-3 py-2 border">{entitie.chofer || "Desconocido"}</td>
                  <td className="px-3 py-2 border">{exception.tipo || ""}</td>
                  <td className="px-3 py-2 border">{exception.lugar || ""}</td>
                  <td className="px-3 py-2 border">{exception.fecha || ""}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-blue-500">No hay excepciones</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}