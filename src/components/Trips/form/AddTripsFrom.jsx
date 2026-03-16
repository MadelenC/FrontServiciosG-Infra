import React, { useState, useEffect } from "react";

export default function ReservaModal({ initialData, isOpen, onClose, onSave, choferes, encargados, vehiculos, destinos }) {
  const [formData, setFormData] = useState({
    destinos: [{ nombre: "", km: "" }],
    kmAdicional: "",
    tipoViaje: "",
    pasajeros: "",
    inicio: "",
    final: "",
    chofer: "",
    vehiculo: "",
    encargado: "",
    entidad: "",
    objetivo: "",
  });

  // Control para mostrar todos los destinos al hacer focus
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
        chofer: initialData.chofer || "",
        vehiculo: initialData.vehiculo || "",
        encargado: initialData.encargado || "",
        entidad: initialData.entidad || "",
        objetivo: initialData.objetivo || "",
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleDestinoChange = (index, value) => {
    const nuevosDestinos = [...formData.destinos];
    nuevosDestinos[index].nombre = value;
    setFormData((f) => ({ ...f, destinos: nuevosDestinos }));
  };

  const seleccionarDestino = (index, dest) => {
    const nuevosDestinos = [...formData.destinos];
    nuevosDestinos[index] = {
      nombre: `(${dest.departamentoInicio}) ${dest.origen} → (${dest.departamentoFinal}) ${dest.destino}`,
      km: dest.distancia || "",
    };
    setFormData((f) => ({ ...f, destinos: nuevosDestinos }));
    setShowAllDestinos((prev) => {
      const newShowAll = [...prev];
      newShowAll[index] = false;
      return newShowAll;
    });
  };

  const agregarDestino = () => setFormData((f) => ({ ...f, destinos: [...f.destinos, { nombre: "", km: "" }] }));
  const eliminarDestino = (index) => {
    const nuevosDestinos = formData.destinos.filter((_, i) => i !== index);
    setFormData((f) => ({ ...f, destinos: nuevosDestinos.length ? nuevosDestinos : [{ nombre: "", km: "" }] }));
  };

  const calcularTotalKm = () => {
    let total = Number(formData.kmAdicional || 0);
    formData.destinos.forEach((d) => { total += Number(d.km || 0); });
    return total;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
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
                    className="flex-1 border px-3 py-1.5 rounded-md text-sm bg-white"
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
              <input type="number" name="kmAdicional" placeholder="Km adicional" value={formData.kmAdicional} onChange={handleChange} className="w-36 border px-3 py-1.5 rounded-md text-sm"/>
              <input type="text" value={calcularTotalKm()} readOnly className="w-28 border px-3 py-1.5 rounded-md bg-gray-100 font-semibold text-sm"/>
            </div>
          </div>

          {/* Información general */}
          <div className="bg-white p-4 rounded-lg shadow-sm border grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-gray-900 text-sm font-semibold">Tipo de viaje</label>
              <select name="tipoViaje" value={formData.tipoViaje} onChange={handleChange} className="w-full border px-3 py-1.5 rounded-md text-sm">
                <option value="">Seleccione</option>
                <option>Viaje de Práctica</option>
                <option>Viaje de Inspección</option>
                <option>Viaje Académico</option>
                <option>Viaje de Cultura</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-gray-900 text-sm font-semibold">Número de pasajeros</label>
              <input type="number" name="pasajeros" value={formData.pasajeros} onChange={handleChange} className="w-full border px-3 py-1.5 rounded-md text-sm"/>
            </div>
            <div>
              <label className="block mb-1 text-gray-900 text-sm font-semibold">Fecha de inicio</label>
              <input type="datetime-local" name="inicio" value={formData.inicio} onChange={handleChange} className="w-full border px-3 py-1.5 rounded-md text-sm"/>
            </div>
            <div>
              <label className="block mb-1 text-gray-900 text-sm font-semibold">Fecha de fin</label>
              <input type="datetime-local" name="final" value={formData.final} onChange={handleChange} className="w-full border px-3 py-1.5 rounded-md text-sm"/>
            </div>
          </div>

          {/* Choferes, Vehículos y Encargados */}
          <div className="bg-white p-4 rounded-lg shadow-sm border grid grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 text-gray-900 text-sm font-semibold">Choferes</label>
              <select name="chofer" value={formData.chofer} onChange={handleChange} className="w-full border px-3 py-1.5 rounded-md text-sm">
                <option value="">Seleccione chofer</option>
                {choferes?.map(c => (<option key={c.id} value={c.id}>{c.nombres} {c.apellidos}</option>))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-gray-900 text-sm font-semibold">Vehículos</label>
              <select
                name="vehiculo"
                value={formData.vehiculo}
                onChange={handleChange}
                className="w-full border px-3 py-1.5 rounded-md text-sm"
              >
                <option value="">Seleccione vehículo</option>
                {vehiculos?.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.tipog} {v.placa}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-gray-900 text-sm font-semibold">Encargados</label>
              <select name="encargado" value={formData.encargado} onChange={handleChange} className="w-full border px-3 py-1.5 rounded-md text-sm">
                <option value="">Seleccione encargado</option>
                {encargados?.map(u => (<option key={u.id} value={u.id}>{u.nombres} {u.apellidos}</option>))}
              </select>
            </div>
          </div>

          {/* Entidad y objetivo */}
          <div className="bg-white p-4 rounded-lg shadow-sm border space-y-3">
            <div>
              <label className="block mb-1 text-gray-900 text-sm font-semibold">Entidad</label>
              <input type="text" name="entidad" value={formData.entidad} onChange={handleChange} className="w-full border px-3 py-1.5 rounded-md text-sm"/>
            </div>
            <div>
              <label className="block mb-1 text-gray-900 text-sm font-semibold">Dias</label>
              <input type="text" name="entidad" value={formData.entidad} onChange={handleChange} className="w-full border px-3 py-1.5 rounded-md text-sm"/>
            </div>
            <div>
              <label className="block mb-1 text-gray-900 text-sm font-semibold">Objetivo</label>
              <textarea name="objetivo" value={formData.objetivo} onChange={handleChange} rows={3} className="w-full border px-3 py-1.5 rounded-md text-sm"/>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-3 border-t">
            <button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-1.5 rounded-md text-sm">Cancelar</button>
            <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-1.5 rounded-md text-sm">Registrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}