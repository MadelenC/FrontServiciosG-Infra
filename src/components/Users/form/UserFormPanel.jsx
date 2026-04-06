import React from "react";
import { toast } from "react-toastify";
import { useUserStore } from "../../../zustand/userStore";
import GeneralForm from "./GeneralForm";
import EncargadoForm from "./EncargadoForm";

export default function UserFormPanel({ open, onClose, formType, setFormType }) {
  const createUser = useUserStore((state) => state.createUser);

  const handleSubmit = async (userData) => {
    const result = await createUser(userData);
    if (result.ok) {
      toast.success("Usuario registrado correctamente");
      onClose();
    } else {
      toast.error("Error al registrar usuario: " + result.error);
    }
  };  

  if (!open) return null;

  const panelWidth = formType ? "w-full max-w-lg" : "w-80";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 ">
      
      <div
        className={`${panelWidth} relative bg-white rounded-2xl shadow-2xl
                    p-6 transition-all duration-300`}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 font-bold px-3 py-1 rounded hover:bg-gray-200"
          aria-label="Cerrar formulario"
        >
          X
        </button>

        {/* Selector de formulario */}
        {formType === null && (
          <div className="flex flex-col items-center gap-5 py-6">
            <h1 className="text-lg font-semibold text-gray-800">
              Seleccione un formulario
            </h1>

            <button
              onClick={() => setFormType("general")}
              className="w-full max-w-xs py-3 rounded-xl
                         bg-gradient-to-r from-indigo-600 to-indigo-500
                         text-white font-medium
                         hover:from-indigo-700 hover:to-indigo-600
                         transition shadow-md"
            >
              Registro General
            </button>

            <button
              onClick={() => setFormType("encargado")}
              className="w-full max-w-xs py-3 rounded-xl
                         bg-gray-100 text-gray-700 font-medium
                         hover:bg-gray-200 transition"
            >
              Registro Encargado
            </button>
          </div>
        )}

        {/* Formularios */}
        {formType === "general" && <GeneralForm onSubmit={handleSubmit} />}
        {formType === "encargado" && <EncargadoForm onSubmit={handleSubmit} />}
      </div>
    </div>
  );
}


































