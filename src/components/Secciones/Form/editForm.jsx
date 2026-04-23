import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function EditSeccionForm({
  isOpen,
  onClose,
  onSave,
  onDelete, // 🔥 nuevo
  initialData,
}) {
  const [seccion, setSeccion] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (isOpen && initialData) {
      setSeccion(initialData.nombre || "");
    }
  }, [isOpen, initialData]);

  // VALIDACIÓN
  const validateSeccion = (value) => {
    const text = value.trim();

    if (!text) return "La sección es obligatoria";
    if (text.length < 3)
      return "La sección debe tener al menos 3 caracteres";
    if (text.length > 100)
      return "La sección no puede exceder 100 caracteres";

    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!regex.test(text))
      return "La sección solo debe contener letras";

    return null;
  };

  // ACTUALIZAR
  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateSeccion(seccion);
    if (error) {
      toast.error(error);
      return;
    }

    try {
      setSaving(true);

      const res = await onSave({
        nombre: seccion.trim(),
      });

      if (!res?.ok) {
        toast.error(res?.error || "Error al actualizar");
        return;
      }

      toast.success("Sección actualizada correctamente");
      onClose();
    } catch (error) {
      toast.error("Error del servidor");
    } finally {
      setSaving(false);
    }
  };

  // ELIMINAR 🔥
  const handleDelete = async () => {
    if (!initialData?.id) return;

    const confirm = window.confirm(
      "¿Seguro que deseas eliminar esta sección?"
    );

    if (!confirm) return;

    try {
      setDeleting(true);

      const res = await onDelete(initialData.id);

      if (!res?.ok) {
        toast.error(res?.error || "Error al eliminar");
        return;
      }

      toast.success("Sección eliminada correctamente");
      onClose();
    } catch (error) {
      toast.error("Error del servidor");
    } finally {
      setDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-5">

      <div className="bg-white w-full max-w-md rounded-xl shadow-xl relative p-6">

        {/* cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 px-3 py-1 hover:bg-gray-200 rounded"
        >
          X
        </button>

        <h2 className="text-xl font-bold text-center mb-5">
          Editar Sección
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* INPUT */}
          <div>
            <label className="block mb-1 font-semibold">
              Sección
            </label>

            <input
              type="text"
              value={seccion}
              onChange={(e) => setSeccion(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          {/* BOTONES */}
          <div className="flex gap-2">

            {/* actualizar */}
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-blue-600 text-white py-2 rounded-md"
            >
              {saving ? "Actualizando..." : "Actualizar"}
            </button>

            {/* eliminar */}
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="flex-1 bg-red-600 text-white py-2 rounded-md"
            >
              {deleting ? "Eliminando..." : "Eliminar"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}