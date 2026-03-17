// CashBudgetForm.js
import React, { useState } from "react";

export default function CashBudgetForm({ data, onClose, onSave }) {
  const [form, setForm] = useState({
    vehiculo: data?.vehiculo || "",
    chofer: data?.chofer || "",
    encargado: data?.encargado || "",
    departamento: data?.departamento || "DEPARTAMENTO DE INFRAESTRUCTURA DE LA UATF",
    kilometrajeTotal: data?.kilometrajeTotal || 0,
    gasolinaDiesel: data?.gasolinaDiesel || "",
    litros: data?.litros || 0,
    nroVuelta: data?.nroVuelta || 0,
    fechaVuelta: data?.fechaVuelta || "",
    nroOrden: data?.nroOrden || "",
    objetivo: data?.objetivo || "",
  });

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-10 z-50 overflow-y-auto">
      <div className="bg-white w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] max-w-[1000px] p-6 rounded-xl shadow-lg space-y-6">
        
        <h2 className="text-2xl font-bold">Presupuesto de viaje por caja</h2>

        <div className="grid grid-cols-2 gap-4 mt-2">
          <Input label="Vehículo" value={form.vehiculo} onChange={v => handleChange("vehiculo", v)} />
          <Input label="Chofer" value={form.chofer} onChange={v => handleChange("chofer", v)} />
          <Input label="Encargado del viaje" value={form.encargado} onChange={v => handleChange("encargado", v)} />
          <Input label="Viaje de" value={`${form.departamento} con 720.00 km.`} readOnly />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-2">
          <Input label="Kilometraje Total (Ejm. 100)" type="number" value={form.kilometrajeTotal} onChange={v => handleChange("kilometrajeTotal", Number(v))} />
          <Input label="Gasolina/Diesel (Ejm. 4 o 6)" value={form.gasolinaDiesel} onChange={v => handleChange("gasolinaDiesel", v)} />
          <Input label="Litros" type="number" value={form.litros} onChange={v => handleChange("litros", Number(v))} />
          <Input label="Nro. de Vuelta" type="number" value={form.nroVuelta} onChange={v => handleChange("nroVuelta", Number(v))} />
          <Input label="Fecha del Nro. de Vuelta" type="date" value={form.fechaVuelta} onChange={v => handleChange("fechaVuelta", v)} />
          <Input label="Nro. de Orden" value={form.nroOrden} onChange={v => handleChange("nroOrden", v)} />
          <Input label="Objetivo del Viaje" value={form.objetivo} onChange={v => handleChange("objetivo", v)} colSpan={2} />
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 border rounded">Cancelar</button>
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => onSave({ ...form, id: data.id })}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

// Componente Input reutilizable
const Input = ({ label, type = "text", value, onChange, readOnly, colSpan = 1 }) => (
  <div className={`col-span-${colSpan}`}>
    <label className="block text-sm font-medium">{label}</label>
    <input 
      type={type} 
      value={value} 
      onChange={e => onChange(e.target.value)} 
      readOnly={readOnly} 
      className={`border p-2 rounded w-full ${readOnly ? "bg-gray-100" : ""}`} 
    />
  </div>
);