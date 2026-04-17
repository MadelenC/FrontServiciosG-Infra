import React, { useState, useRef, useEffect } from "react";
import { FaPlus, FaEye, FaEllipsisV, FaTrash, FaBroom } from "react-icons/fa";
import AddExceptionForm from "../form/Excep/AddExceptionForm";

export default function TravelRow({
  entitie,
  onViewExceptions,
  onDelete,
  onAddException
}) {
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

  const cellClass =
    "border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300";

  return (
    <>
      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">

        <td className={cellClass}>{entitie.displayId}</td>
        <td className={cellClass}>{entitie.chofer}</td>
        <td className={cellClass}>{entitie.tipoA}</td>
        <td className={cellClass}>{entitie.tipoB}</td>
        <td className={cellClass}>{entitie.tipoC}</td>
        <td className={`${cellClass} text-center`}>{entitie.cantidad}</td>

        {/* EXCEPCIONES */}
        <td className={`${cellClass} text-center relative`} ref={refExcepciones}>

          <div className="relative inline-flex items-center">
            <button
              onClick={() => setOpenExcepciones(!openExcepciones)}
              className="flex items-center gap-1 p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs hover:bg-indigo-200 dark:hover:bg-indigo-800 transition"
            >
              <FaPlus size={10} /> Añadir
            </button>

            {entitie.exceptions?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                {entitie.exceptions.length}
              </span>
            )}
          </div>

          {openExcepciones && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-28 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">

              <button
                onClick={handleAdd}
                className="w-full px-3 py-1.5 text-xs text-left hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-1 text-gray-700 dark:text-gray-300"
              >
                <FaPlus size={12} /> Añadir
              </button>

              <button
                onClick={() => onViewExceptions(entitie)}
                className="w-full px-3 py-1.5 text-xs text-left hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-1 text-gray-700 dark:text-gray-300"
              >
                <FaEye size={12} /> Ver
              </button>

            </div>
          )}
        </td>

        <td className={cellClass}>{entitie.fecha}</td>

        {/* OPERACIONES */}
        <td className={`${cellClass} text-center relative`} ref={refOperaciones}>

          <button
            onClick={() => setOpenOperaciones(!openOperaciones)}
            className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs flex items-center gap-1 hover:bg-green-200 dark:hover:bg-green-800 transition"
          >
            Opciones <FaEllipsisV size={12} />
          </button>

          {openOperaciones && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-36 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">

              <button className="w-full px-3 py-1.5 text-xs text-left hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <FaEye /> Mostrar
              </button>

              <button className="w-full px-3 py-1.5 text-xs text-left hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <FaPlus /> Insertar
              </button>

              <button className="w-full px-3 py-1.5 text-xs text-left hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <FaBroom /> Limpiar
              </button>

              <button
                onClick={() => onDelete(entitie.id)}
                className="w-full px-3 py-1.5 text-xs text-left hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 text-red-600"
              >
                <FaTrash /> Eliminar
              </button>

            </div>
          )}
        </td>

      </tr>

      {openAddExceptionForm && (
        <AddExceptionForm
          travel={entitie}
          onClose={() => setOpenAddExceptionForm(false)}
          onAdd={onAddException}
        />
      )}
    </>
  );
}





