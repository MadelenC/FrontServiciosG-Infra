import React, { useState, useEffect } from "react";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddTripsModal({ initialData, isOpen, onClose, onSave, choferes, encargados, vehiculos, destinos }) {
  const [formData, setFormData] = useState({
    destinos: [{ nombre: "", km: "" }],
    kmAdicional: "",
    tipoViaje: "",
    pasajeros: "",
    inicio: "",
    final: "",
    chofer: [],
    vehiculo: [],
    encargado: [],
    entidad: "",
    dias: "",
    objetivo: "",
  });

  const [errors, setErrors] = useState({});
  const [showAllDestinos, setShowAllDestinos] = useState([]);

  useEffect(() => {
    if (initialData) {
      const formatLocalDateTime = (d) => {
        if (!d) return "";
        const date = new Date(d);
        const pad = (n) => n.toString().padStart(2, "0");
        const yyyy = date.getFullYear();
        const mm = pad(date.getMonth() + 1);
        const dd = pad(date.getDate());
        const hh = pad(date.getHours());
        const min = pad(date.getMinutes());
        return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
      };

      setFormData({
        destinos:
          initialData.destinos?.length
            ? initialData.destinos.map((d) => ({ nombre: d.nombre || "", km: d.km || "" }))
            : [{ nombre: "", km: "" }],
        kmAdicional: initialData.kmAdicional || "",
        tipoViaje: initialData.tipoViaje || "",
        pasajeros: initialData.pasajeros || "",
        inicio: formatLocalDateTime(initialData.fecha_inicial),
        final: formatLocalDateTime(initialData.fecha_final),
        chofer: initialData.chofer ? initialData.chofer.map(c => ({ value: c.id, label: `${c.nombres} ${c.apellidos}` })) : [],
        vehiculo: initialData.vehiculo ? initialData.vehiculo.map(v => ({ value: v.id, label: `${v.tipog} ${v.placa}` })) : [],
        encargado: initialData.encargado ? initialData.encargado.map(u => ({ value: u.id, label: `${u.nombres} ${u.apellidos}` })) : [],
        entidad: initialData.entidad || "",
        dias: initialData.dias || "",
        objetivo: initialData.objetivo || "",
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));

    // Clear error on change
    if (errors[name]) {
      setErrors((errs) => ({ ...errs, [name]: "" }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let message = "";

    if ((name === "entidad" || name === "objetivo") && !value.trim()) {
      message = name === "entidad" ? "Seleccione una Entidad" : "Inserte el objetivo del viaje";
    }
    if (name === "dias" && (!value || value.trim() === "")) {
      message = "Inserte los días";
    }
    if (name === "tipoViaje" && !value.trim()) {
      message = "Seleccione el tipo de viaje";
    }
    if (name === "pasajeros" && (!value || Number(value) <= 0)) {
      message = "Ingrese número válido de pasajeros";
    }
    if ((name === "inicio" || name === "final") && !value) {
      message = name === "inicio" ? "Seleccione la fecha de inicio" : "Seleccione la fecha de fin";
    }

    setErrors((errs) => ({ ...errs, [name]: message }));
  };

  const handleMultiSelectChange = (field, selectedOptions) => {
    setFormData((f) => ({
      ...f,
      [field]: selectedOptions || [],
    }));

    if (errors[field]) {
      setErrors((errs) => ({ ...errs, [field]: "" }));
    }
  };

  const handleDestinoChange = (index, value) => {
    const nuevosDestinos = [...formData.destinos];
    nuevosDestinos[index].nombre = value;
    setFormData((f) => ({ ...f, destinos: nuevosDestinos }));

    if (errors.destinos) {
      setErrors((errs) => ({ ...errs, destinos: "" }));
    }
  };

  const seleccionarDestino = (index, dest) => {
    const nuevosDestinos = [...formData.destinos];
    nuevosDestinos[index] = {
       id: dest.id,
      nombre: `(${dest.departamentoInicio}) ${dest.origen} → (${dest.departamentoFinal}) ${dest.destino}`,
      km: dest.distancia || "",
    };
    setFormData((f) => ({ ...f, destinos: nuevosDestinos }));
    setShowAllDestinos((prev) => {
      const newShowAll = [...prev];
      newShowAll[index] = false;
      return newShowAll;
    });

    if (errors.destinos) {
      setErrors((errs) => ({ ...errs, destinos: "" }));
    }
  };

  const agregarDestino = () => setFormData((f) => ({ ...f, destinos: [...f.destinos, { nombre: "", km: "" }] }));
  const eliminarDestino = (index) => {
    const nuevosDestinos = formData.destinos.filter((_, i) => i !== index);
    setFormData((f) => ({ ...f, destinos: nuevosDestinos.length ? nuevosDestinos : [{ nombre: "", km: "" }] }));

    if (errors.destinos) {
      setErrors((errs) => ({ ...errs, destinos: "" }));
    }
  };

  const calcularTotalKm = () => {
    let total = Number(formData.kmAdicional || 0);
    formData.destinos.forEach((d) => { total += Number(d.km || 0); });
    return total;
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.entidad.trim()) newErrors.entidad = "Seleccione una Entidad";
    if (!formData.dias || formData.dias.trim() === "") newErrors.dias = "Inserte los días";
    if (!formData.objetivo.trim()) newErrors.objetivo = "Inserte el objetivo del viaje";
    if (!formData.tipoViaje.trim()) newErrors.tipoViaje = "Seleccione el tipo de viaje";
    if (!formData.pasajeros || Number(formData.pasajeros) <= 0) newErrors.pasajeros = "Ingrese número válido de pasajeros";
    if (!formData.inicio) newErrors.inicio = "Seleccione la fecha de inicio";
    if (!formData.final) newErrors.final = "Seleccione la fecha de fin";

    if (!formData.chofer.length) newErrors.chofer = "Seleccione al menos un chofer";
    if (!formData.vehiculo.length) newErrors.vehiculo = "Seleccione al menos un vehículo";
    if (!formData.encargado.length) newErrors.encargado = "Seleccione al menos un encargado";

    if (!formData.destinos.some(d => d.nombre.trim() !== "")) {
      newErrors.destinos = "Agregue al menos un destino válido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Por favor complete los campos obligatorios en rojo.");
      return;
    }

    const dataToSend = {
      ...formData,
      chofer: formData.chofer.map(c => c.value),
      vehiculo: formData.vehiculo.map(v => v.value),
      encargado: formData.encargado.map(u => u.value),
    };

    onSave(dataToSend);
    toast.success("Viaje registrado correctamente!");
  };

  const choferOptions = choferes?.map(c => ({ value: c.id, label: `${c.nombres} ${c.apellidos}` })) || [];
  const vehiculoOptions = vehiculos?.map(v => ({ value: v.id, label: `${v.tipog} ${v.placa}` })) || [];
  const encargadoOptions = encargados?.map(u => ({ value: u.id, label: `${u.nombres} ${u.apellidos}` })) || [];

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-5">
        <div className="bg-gray-50 w-full max-w-4xl max-h-[80vh] p-6 rounded-xl shadow-2xl text-gray-800 overflow-hidden flex flex-col">
          <h2 className="text-2xl font-bold border-b pb-2 mb-4 text-gray-900 flex-shrink-0">
            Nuevo Viaje
          </h2>

          <form onSubmit={handleSubmit} className="overflow-y-auto flex-grow pr-3 space-y-6">

            {/* Destinos dinámicos */}
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="text-md font-semibold mb-3 text-gray-900 border-b pb-1">Destinos</h3>
              {formData.destinos.map((d, i) => {
                const filteredDestinos = destinos?.filter(dest =>
                  d.nombre
                    ? dest.origen.toLowerCase().includes(d.nombre.toLowerCase()) || dest.destino.toLowerCase().includes(d.nombre.toLowerCase())
                    : true
                );

                return (
                  <div key={i} className="flex gap-2 items-start mb-2 relative">
                    <input
                      type="text"
                      placeholder="Destino"
                      value={d.nombre}
                      onChange={(e) => handleDestinoChange(i, e.target.value)}
                      onFocus={() => setShowAllDestinos(prev => { const newShow = [...prev]; newShow[i] = true; return newShow; })}
                      onBlur={() => setTimeout(() => setShowAllDestinos(prev => { const newShow = [...prev]; newShow[i] = false; return newShow; }), 200)}
                      className={`flex-1 border px-3 py-1.5 rounded-md text-sm bg-white ${errors.destinos ? "border-red-600" : ""}`}
                    />

                    {(showAllDestinos[i] || d.nombre) && filteredDestinos?.length > 0 && (
                      <ul className="absolute top-10 left-0 right-0 max-h-60 overflow-y-auto bg-white border rounded-md z-50 text-sm">
                        {filteredDestinos.map((dest) => (
                          <li
                            key={dest.id}
                            className="px-2 py-1 hover:bg-blue-100 cursor-pointer"
                            onClick={() => seleccionarDestino(i, dest)}
                          >
                            {`(${dest.departamentoInicio}) ${dest.origen} → (${dest.departamentoFinal}) ${dest.destino}`}
                          </li>
                        ))}
                      </ul>
                    )}

                    <input
                      type="number"
                      placeholder="Km."
                      value={d.km}
                      onChange={(e) => {
                        const nuevos = [...formData.destinos];
                        nuevos[i].km = e.target.value;
                        setFormData(f => ({ ...f, destinos: nuevos }));
                      }}
                      className="w-20 border px-3 py-1.5 rounded-md text-sm"
                    />

                    {formData.destinos.length > 1 && (
                      <button type="button" onClick={() => eliminarDestino(i)} className="text-red-500 font-bold text-lg">×</button>
                    )}
                  </div>
                );
              })}
              <button type="button" onClick={agregarDestino} className="mt-2 text-gray-600 font-bold text-sm flex items-center gap-1">+ Agregar destino</button>
              <div className="flex gap-2 mt-4 items-center">
                <input
                  type="number"
                  name="kmAdicional"
                  placeholder="Km adicional"
                  value={formData.kmAdicional}
                  onChange={handleChange}
                  className="w-36 border px-3 py-1.5 rounded-md text-sm"
                />
                <input
                  type="text"
                  value={calcularTotalKm()}
                  readOnly
                  className="w-28 border px-3 py-1.5 rounded-md bg-gray-100 font-semibold text-sm"
                />
              </div>
            </div>

            {/* Información general */}
            <div className="bg-white p-4 rounded-lg shadow-sm border grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-gray-900 text-sm font-semibold">Tipo de viaje</label>
                <select
                  name="tipoViaje"
                  value={formData.tipoViaje}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full border px-3 py-1.5 rounded-md text-sm ${errors.tipoViaje ? "border-red-600" : ""}`}
                >
                  <option value="">Seleccione</option>
                  <option>Viaje de Práctica</option>
                  <option>Viaje de Inspección</option>
                  <option>Viaje Académico</option>
                  <option>Viaje de Cultura</option>
                </select>
                {errors.tipoViaje && <p className="text-red-600 text-xs mt-1">{errors.tipoViaje}</p>}
              </div>
              <div>
                <label className="block mb-1 text-gray-900 text-sm font-semibold">Número de pasajeros</label>
                <input
                  type="number"
                  name="pasajeros"
                  value={formData.pasajeros}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full border px-3 py-1.5 rounded-md text-sm ${errors.pasajeros ? "border-red-600" : ""}`}
                  min={1}
                />
                {errors.pasajeros && <p className="text-red-600 text-xs mt-1">{errors.pasajeros}</p>}
              </div>
              <div>
                <label className="block mb-1 text-gray-900 text-sm font-semibold">Fecha de inicio</label>
                <input
                  type="datetime-local"
                  name="inicio"
                  value={formData.inicio}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full border px-3 py-1.5 rounded-md text-sm ${errors.inicio ? "border-red-600" : ""}`}
                />
                {errors.inicio && <p className="text-red-600 text-xs mt-1">{errors.inicio}</p>}
              </div>
              <div>
                <label className="block mb-1 text-gray-900 text-sm font-semibold">Fecha de fin</label>
                <input
                  type="datetime-local"
                  name="final"
                  value={formData.final}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full border px-3 py-1.5 rounded-md text-sm ${errors.final ? "border-red-600" : ""}`}
                />
                {errors.final && <p className="text-red-600 text-xs mt-1">{errors.final}</p>}
              </div>
            </div>

            {/* Choferes, Vehículos y Encargados */}
            <div className="bg-white p-4 rounded-lg shadow-sm border grid grid-cols-3 gap-4">
              <div>
                <label className="block mb-1 text-gray-900 text-sm font-semibold">Choferes</label>
                <Select
                  isMulti
                  name="chofer"
                  options={choferOptions}
                  value={formData.chofer}
                  onChange={(selected) => handleMultiSelectChange("chofer", selected)}
                  classNamePrefix="react-select"
                  placeholder="Seleccione choferes"
                  className={errors.chofer ? "react-select-container border-red-600 rounded-md" : "react-select-container"}
                />
                {errors.chofer && <p className="text-red-600 text-xs mt-1">{errors.chofer}</p>}
              </div>

              <div>
                <label className="block mb-1 text-gray-900 text-sm font-semibold">Vehículos</label>
                <Select
                  isMulti
                  name="vehiculo"
                  options={vehiculoOptions}
                  value={formData.vehiculo}
                  onChange={(selected) => handleMultiSelectChange("vehiculo", selected)}
                  classNamePrefix="react-select"
                  placeholder="Seleccione vehículos"
                  className={errors.vehiculo ? "react-select-container border-red-600 rounded-md" : "react-select-container"}
                />
                {errors.vehiculo && <p className="text-red-600 text-xs mt-1">{errors.vehiculo}</p>}
              </div>

              <div>
                <label className="block mb-1 text-gray-900 text-sm font-semibold">Encargados</label>
                <Select
                  isMulti
                  name="encargado"
                  options={encargadoOptions}
                  value={formData.encargado}
                  onChange={(selected) => handleMultiSelectChange("encargado", selected)}
                  classNamePrefix="react-select"
                  placeholder="Seleccione encargados"
                  className={errors.encargado ? "react-select-container border-red-600 rounded-md" : "react-select-container"}
                />
                {errors.encargado && <p className="text-red-600 text-xs mt-1">{errors.encargado}</p>}
              </div>
            </div>

            {/* Entidad, Días y Objetivo */}
            <div className="bg-white p-4 rounded-lg shadow-sm border space-y-3">
              <div>
                <label className="block mb-1 text-gray-900 text-sm font-semibold">Entidad</label>
                <input
                  type="text"
                  name="entidad"
                  value={formData.entidad}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full border px-3 py-1.5 rounded-md text-sm ${errors.entidad ? "border-red-600" : ""}`}
                />
                {errors.entidad && <p className="text-red-600 text-xs mt-1">{errors.entidad}</p>}
              </div>
              <div>
                <label className="block mb-1 text-gray-900 text-sm font-semibold">Días</label>
                <input
                  type="text"
                  name="dias"
                  value={formData.dias || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full border px-3 py-1.5 rounded-md text-sm ${errors.dias ? "border-red-600" : ""}`}
                />
                {errors.dias && <p className="text-red-600 text-xs mt-1">{errors.dias}</p>}
              </div>
              <div>
                <label className="block mb-1 text-gray-900 text-sm font-semibold">Objetivo</label>
                <textarea
                  name="objetivo"
                  value={formData.objetivo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={3}
                  className={`w-full border px-3 py-1.5 rounded-md text-sm ${errors.objetivo ? "border-red-600" : ""}`}
                />
                {errors.objetivo && <p className="text-red-600 text-xs mt-1">{errors.objetivo}</p>}
              </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-3 pt-3 border-t">
              <button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-1.5 rounded-md text-sm">
                Cancelar
              </button>
              <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-1.5 rounded-md text-sm">
                Registrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}