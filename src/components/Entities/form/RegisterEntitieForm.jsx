import React, { useState } from "react";
import { useEntidadStore } from "../../../zustand/useEntidadStore";

export default function RegisterEntityForm({ onClose }) {
  const addEntidad = useEntidadStore((state) => state.addEntidad);

  const [formData, setFormData] = useState({
    facultad: "",
    carrera: "",
    materia: "",
    sigla: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const inputBase = "p-2 border rounded text-sm w-full";
  const inputError = "border-red-500 bg-red-50";

  const requiredFields = ["facultad", "carrera", "materia", "sigla"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (requiredFields.includes(name) && !value?.trim()) {
      setErrors((prev) => ({ ...prev, [name]: "Este campo es obligatorio" }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]?.trim()) newErrors[field] = "Este campo es obligatorio";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const result = await addEntidad(formData);
    setLoading(false);

    if (result.ok) {
      alert("Entidad registrada correctamente");
      setFormData({
        facultad: "",
        carrera: "",
        materia: "",
        sigla: "",
      });
      onClose?.();
    } else {
      alert("Error al registrar la entidad: " + result.error);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 w-full max-w-md mx-auto bg-white p-6 rounded-xl shadow-md"
      onSubmit={handleSubmit}
    >
      <h3 className="text-center font-bold text-gray-600 mb-4">Registrar Entidad</h3>

      {/* Inputs uno debajo del otro */}
      {["facultad", "carrera", "materia", "sigla"].map((field) => (
        <div key={field} className="flex flex-col">
          <label className="text-gray-600 text-xs capitalize">{field}:</label>
          <input
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={`Ingrese ${field}`}
            className={`${inputBase} ${errors[field] ? inputError : ""}`}
          />
          {errors[field] && (
            <span className="text-red-500 text-xs mt-1">{errors[field]}</span>
          )}
        </div>
      ))}

      {/* Botones */}
      <div className="flex justify-center mt-4 gap-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded border border-gray-300 text-gray-800 hover:bg-gray-100 transition"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded bg-indigo-700 text-white hover:bg-indigo-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </form>
  );
}

