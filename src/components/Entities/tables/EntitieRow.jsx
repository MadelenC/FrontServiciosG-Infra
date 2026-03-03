import React from "react";
import { FaEdit } from "react-icons/fa";

export default function EntitieRow({ entitie, onEdit }) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="border border-gray-200 px-3 py-2 text-center text-gray-700">
        {entitie.id}
      </td>
      <td className="border border-gray-200 px-3 py-2 text-gray-700">
        {entitie.facultad}
      </td>
      <td className="border border-gray-200 px-3 py-2 text-gray-700">
        {entitie.carrera}
      </td>
      <td className="border border-gray-200 px-3 py-2 text-gray-700">
        {entitie.materia}
      </td>
      <td className="border border-gray-200 px-3 py-2 text-gray-700">
        {entitie.sigla}
      </td>
      <td className="border border-gray-200 px-3 py-2 text-center text-gray-700">
        <button
          className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition"
          title="Editar entidad"
          onClick={() => onEdit(entitie)}
        >
          <FaEdit size={14} />
        </button>
      </td>
    </tr>
  );
}




