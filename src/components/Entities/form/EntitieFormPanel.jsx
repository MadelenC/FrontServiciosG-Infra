
import React from "react";
import RegisterEntityForm from "./RegisterEntitieForm";

export default function EntitieFormPanel({ open, onClose, entitie }) {
  if (!open) return null;

  const isEdit = Boolean(entitie);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center
                 bg-black/40 backdrop-blur-sm pt-24"
      onClick={onClose}
    >
      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-lg
                   bg-white rounded-2xl shadow-2xl
                   transition-all duration-300
                   animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-700">
            {isEdit ? "Editar Entidad" : ""}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-500
                       text-xl font-bold"
            aria-label="Cerrar"
          >
            X
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <RegisterEntityForm
            entitie={entitie}
            onSuccess={onClose}
          />
        </div>
      </div>
    </div>
  );
}
