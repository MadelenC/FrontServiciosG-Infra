import React, { useState } from "react";

export default function AddVehicleForm({ onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    asignadoA: "",
    placa: "",
    color: "",
    motor: "",
    chasis: "",
    cilindrada: "",
    pasajeros: "",
    kilometraje: "",
    estado: "",
    tipoGeneral: "",
    marca: "",
    modelo: "",
    tipoEspecifico: "",
  });

  const [errors, setErrors] = useState({});

  // Maneja cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));
  };

  // Validación al perder foco
  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!value.trim()) setErrors((prev) => ({ ...prev, [name]: "Campo obligatorio" }));
    else setErrors((prev) => ({ ...prev, [name]: false }));
  };

  // Validación y envío
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim()) newErrors[key] = "Campo obligatorio";
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return; // si hay errores no envía

    // Llamada a onSubmit del padre (que enviará con Axios)
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/20 pt-9">
      <div className="bg-white rounded-lg shadow-md w-full max-w-2xl p-4 overflow-y-auto max-h-[75vh] relative">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 pt-2 pl-10">Nuevo Vehículo</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-2 p-5">
          {[
            { label: "Asignado a", name: "asignadoA" },
            { label: "Placa", name: "placa" },
            { label: "Color", name: "color" },
            { label: "Motor", name: "motor" },
            { label: "Chasis", name: "chasis" },
            { label: "Cilindrada", name: "cilindrada" },
            { label: "Pasajeros", name: "pasajeros" },
            { label: "Kilometraje", name: "kilometraje" },
            { label: "Tipo general", name: "tipoGeneral" },
            { label: "Marca", name: "marca" },
            { label: "Modelo", name: "modelo" },
            { label: "Tipo específico", name: "tipoEspecifico" },
          ].map((field) => (
            <Input
              key={field.name}
              label={field.label}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors[field.name]}
            />
          ))}

          <Select
            label="Estado"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            onBlur={handleBlur}
            options={["", "optimo", "mantenimiento", "desuso"]}
            error={errors.estado}
          />

          <div className="md:col-span-3 flex justify-end mt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              Registrar
            </button>
          </div>
        </form>

        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-600 hover:text-gray-900 text-[2.5rem] leading-none p-2"
        >
          ×
        </button>
      </div>
    </div>
  );
}

// Input con error
function Input({ label, name, value, onChange, onBlur, error }) {
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`h-9 px-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full ${
          error ? "border-red-500 bg-red-50" : "border-gray-300"
        }`}
        placeholder={`Ingrese ${label}`}
      />
      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
}

// Select con error
function Select({ label, name, value, onChange, onBlur, options, error }) {
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`h-9 px-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full ${
          error ? "border-red-500 bg-red-50" : "border-gray-300"
        }`}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt === "" ? "Seleccione estado" : opt}
          </option>
        ))}
      </select>
      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
}
