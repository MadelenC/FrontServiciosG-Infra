import React, { useState, useRef, useEffect } from "react";
import { FaPlus, FaEye, FaEllipsisV, FaTrash, FaBroom } from "react-icons/fa";
import AddExceptionForm from "../form/Excep/AddExceptionForm";

export default function TravelRow({ entitie, onViewExceptions, onDelete}) {
  const [openExcepciones, setOpenExcepciones] = useState(false);
  const [openOperaciones, setOpenOperaciones] = useState(false);
  const [openAddExceptionForm, setOpenAddExceptionForm] = useState(false);

  const refExcepciones = useRef(null);
  const refOperaciones = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (refExcepciones.current && !refExcepciones.current.contains(event.target))
        setOpenExcepciones(false);
      if (refOperaciones.current && !refOperaciones.current.contains(event.target))
        setOpenOperaciones(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAdd = () => {
    setOpenAddExceptionForm(true);
    setOpenExcepciones(false);
  };

  return (
    <>
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="border px-3 py-2 text-center">{entitie.displayId}</td>
        <td className="border px-3 py-2">{entitie.chofer}</td>
        <td className="border px-3 py-2">{entitie.tipoA}</td>
        <td className="border px-3 py-2">{entitie.tipoB}</td>
        <td className="border px-3 py-2">{entitie.tipoC}</td>
        <td className="border px-3 py-2 text-center">{entitie.cantidad}</td>

        {/* Excepciones */}
        <td className="border px-3 py-2 text-center relative" ref={refExcepciones}>
          <button
            onClick={() => setOpenExcepciones(!openExcepciones)}
            className="flex items-center gap-1 p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition text-xs"
          >
              <FaPlus size={10} /> Añadir
          </button>

          {openExcepciones && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-28 bg-white border rounded-md shadow-lg z-50">
              <button
                onClick={handleAdd}
                className="w-full px-3 py-1.5 text-xs text-left hover:bg-gray-100 flex items-center gap-1"
              >
                <FaPlus size={12} /> Añadir
              </button>
              <button
                onClick={() => onViewExceptions(entitie)}
                className="w-full px-3 py-1.5 text-xs text-left hover:bg-gray-100 flex items-center gap-1"
              >
                <FaEye size={12} /> Ver
              </button>
            </div>
          )}
        </td>

        <td className="border px-3 py-2 text-center">{entitie.fecha}</td>

        {/* Operaciones */}
        <td className="border px-3 py-2 text-center relative" ref={refOperaciones}>
          <button
            onClick={() => setOpenOperaciones(!openOperaciones)}
            className="p-2 rounded-full bg-green-100 text-green-500 hover:bg-green-200 transition text-xs flex items-center gap-1 justify-center"
          >
            Opciones <FaEllipsisV size={12} />
          </button>
          {openOperaciones && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-36 bg-white border rounded-md shadow-lg z-50">
              <button onClick={() => console.log("Mostrar:", entitie)} className="w-full px-3 py-1.5 text-xs text-left hover:bg-gray-100 flex items-center gap-2">
                <FaEye /> Mostrar
              </button>
              <button onClick={() => console.log("Insertar:", entitie)} className="w-full px-3 py-1.5 text-xs text-left hover:bg-gray-100 flex items-center gap-2">
                <FaPlus /> Insertar
              </button>
              <button onClick={() => console.log("Limpiar:", entitie)} className="w-full px-3 py-1.5 text-xs text-left hover:bg-gray-100 flex items-center gap-2">
                <FaBroom /> Limpiar
              </button>
              <button onClick={() => onDelete(entitie.id)}className="w-full px-3 py-1.5 text-xs text-left hover:bg-gray-100 flex items-center gap-2 text-red-600">
                <FaTrash /> Eliminar
              </button>
            </div>
          )}
        </td>
      </tr>

      {/* Modal para añadir excepción */}
      {openAddExceptionForm && (
        <AddExceptionForm
          travel={entitie}
          onClose={() => setOpenAddExceptionForm(false)}
          onAdd={(data) => console.log("Excepción agregada:", data)}
        />
      )}
    </>
  );
}






