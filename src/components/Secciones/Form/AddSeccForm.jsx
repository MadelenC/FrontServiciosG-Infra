import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function CreateSeccionesForm({
  isOpen,
  onClose,
  onSave,
  listaInstituciones = [],
}) {
  const [nombre, setNombre] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setNombre("");
      setError("");
    }
  }, [isOpen]);

  //  VALIDACIÓN BASE
  const validateNombre = (value) => {
    const text = value.trim();

    if (!text) return "Ingrese un nombre de institución";
    if (text.length < 3) return "Mínimo 3 caracteres";
    if (text.length > 150) return "Máximo 150 caracteres";

    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9.\s\-()]+$/;
    if (!regex.test(text)) return "Contiene caracteres no válidos";

    return null;
  };

  //  NORMALIZAR TEXTO
  const normalize = (text) =>
    (text || "").trim().toLowerCase();

  // INPUT CHANGE
  const handleChange = (value) => {
    setNombre(value);

    const err = validateNombre(value);
    setError(err || "");
  };

  // VALIDACIÓN DUPLICADOS (SEPARADA Y FIABLE)
  const isDuplicate = (value) => {
    const val = normalize(value);

    return (listaInstituciones || []).some(
      (inst) => normalize(inst.nombre) === val
    );
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const value = nombre;

    // 1. validación base
    const err = validateNombre(value);
    if (err) {
      setError(err);
      return;
    }

    // 2. duplicados
    if (isDuplicate(value)) {
      const msg = "Esta institución ya existe";
      setError(msg);
      toast.error(msg);
      return;
    }

    try {
      setSaving(true);

      const res = await onSave({
        nombre: value.trim(),
      });

      if (!res?.ok) {
        toast.error(res?.error || "Error al guardar");
        return;
      }

      toast.success("Institución registrada correctamente");
      onClose();

    } catch (error) {
      toast.error("Error del servidor");
    } finally {
      setSaving(false);
    }
  };

  // estado del botón (UNIFICADO)
  const isValid =
    !validateNombre(nombre) &&
    !isDuplicate(nombre);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-5">

      <div className="bg-white w-full max-w-xl rounded-xl shadow-2xl relative">
         {/* cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 px-3 py-1 hover:bg-gray-200 rounded"
        >
          X
        </button>

        <h2 className="text-2xl font-bold text-center mt-6">
          Registro de Instituciones
        </h2>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* INPUT */}
          <div>
            <label className="block mb-1 font-semibold">
              Nombre de la institución
            </label>

            <input
              type="text"
              value={nombre}
              onChange={(e) => handleChange(e.target.value)}
              className={`w-full border px-3 py-2 rounded-md transition
                ${error ? "border-red-500" : "border-gray-300"}`}
              placeholder="Ej: Carrera de Derecho"
            />

            {error && (
              <p className="text-red-500 text-sm mt-1">
                {error}
              </p>
            )}
          </div>

          {/* BOTÓN */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!isValid || saving}
              className={`px-5 py-2 rounded-md text-white transition
                ${
                  !isValid || saving
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {saving ? "Guardando..." : "Registrar"}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}