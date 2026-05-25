import React, { useEffect } from "react";
import { useUserStore } from "../../../zustand/userStore";
import { useEntidadStore } from "../../../zustand/useEntidadStore";
import EditUserForm from "./EditUserForm";

export default function EditUserPanel({ open, onClose, user }) {
  const updateUser = useUserStore((state) => state.updateUser);
  const deleteUser = useUserStore((state) => state.deleteUser);

  const entidades = useEntidadStore((state) => state.entidades);
  const fetchEntidades = useEntidadStore((state) => state.fetchEntidades);

  useEffect(() => {
    if (open) {
      fetchEntidades();
    }
  }, [open, fetchEntidades]);

  if (!open) return null;

 const handleUpdate = async (updatedData) => {
  try {
    const result = await updateUser(user.id, updatedData);

    if (!result.ok) {
      alert(result.error || "Error al actualizar usuario");
      return { ok: false, error: result.error };
    }

    onClose();


    return result;

  } catch (err) {
    console.error(err);
    return {
      ok: false,
      error: "Error inesperado"
    };
  }
};

  const handleDelete = async () => {
    if (window.confirm("¿Desea eliminar este usuario?")) {
      await deleteUser(user.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-5">
      <div className="w-full max-w-lg bg-white p-6 rounded-md shadow-lg relative max-h-[90vh] overflow-y-auto">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 font-bold px-3 py-1 rounded hover:bg-gray-200"
        >
          X
        </button>

        <h2 className="text-xl font-bold mb-4">Editar Usuario</h2>

        <EditUserForm
          user={user}
          entidades={entidades}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}





