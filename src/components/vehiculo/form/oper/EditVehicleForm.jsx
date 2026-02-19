import React, { useState } from "react";

export default function EditVehicleForm({ vehicleData, onUpdate, onDelete, onClose }) {
  const [formData, setFormData] = useState({
    asignacion: vehicleData.asignacion || "",
    placa: vehicleData.placa || "",
    color: vehicleData.color || "",
    asientos: vehicleData.asientos || "",        // frontend-friendly
    tipog: vehicleData.tipog || "",              // tipo general
    tipoe: vehicleData.tipoe || "",              // tipo específico
    estado: vehicleData.estado || "",
    combustible: vehicleData.combustible || "",
    kilometraje: vehicleData.kilometraje || "",
    marca: vehicleData.marca || "",
    modelo: vehicleData.modelo || "",
    motor: vehicleData.motor || "",
    chasis: vehicleData.chasis || "",
    cilindrada: vehicleData.cilindrada || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdate?.({ id: vehicleData.id, ...formData });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    onDelete?.(vehicleData.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-md w-full max-w-2xl p-4 overflow-y-auto max-h-[75vh] relative">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Actualización de datos del Vehículo
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <Input label="Asignación" name="asignacion" value={formData.asignacion} onChange={handleChange} />
          <Input label="Placa" name="placa" value={formData.placa} onChange={handleChange} />
          <Input label="Color" name="color" value={formData.color} onChange={handleChange} />

          <Input label="Asientos" name="asientos" value={formData.asientos} onChange={handleChange} />
          <Input label="Tipo general" name="tipog" value={formData.tipog} onChange={handleChange} />
          <Select
            label="Estado"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            options={["Optimo", "Mantenimiento", "Desuso"]}
          />

          <Input label="Combustible" name="combustible" value={formData.combustible} onChange={handleChange} />
          <Input label="Kilometraje" name="kilometraje" value={formData.kilometraje} onChange={handleChange} />

          <Input label="Marca" name="marca" value={formData.marca} onChange={handleChange} />
          <Input label="Modelo" name="modelo" value={formData.modelo} onChange={handleChange} />
          <Input label="Tipo específico" name="tipoe" value={formData.tipoe} onChange={handleChange} />

          <Input label="Motor" name="motor" value={formData.motor} onChange={handleChange} />
          <Input label="Chasis" name="chasis" value={formData.chasis} onChange={handleChange} />
          <Input label="Cilindrada" name="cilindrada" value={formData.cilindrada} onChange={handleChange} />

          <div className="md:col-span-3 flex justify-end mt-2 gap-2">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 text-sm"
            >
              Actualizar
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-400 text-white rounded-md hover:bg-red-700 text-sm"
            >
              Eliminar
            </button>
          </div>
        </form>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold text-lg"
        >
          ×
        </button>
      </div>
    </div>
  );
}

// Componente Input reutilizable
function Input({ label, name, value, onChange }) {
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="h-9 px-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
      />
    </div>
  );
}

// Componente Select reutilizable
function Select({ label, name, value, onChange, options }) {
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="h-9 px-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

