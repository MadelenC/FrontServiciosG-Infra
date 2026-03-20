import { useState } from "react";

export default function TripsInformeForm({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    titulo: "",
    fechaInicio: "",
    fechaFin: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };
  
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="relative bg-white w-[420px] rounded-xl shadow-lg p-6">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray font-bold bg-white-600 px-3 py-1 rounded hover:bg-gray-200"
        >
          X
        </button>

        {/* TÍTULO */}
        <h2 className="text-lg font-semibold mb-4">
          Informe de Viajes
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* TÍTULO */}
          <div>
            <label className="text-sm font-medium">Título</label>
            <input
              type="text"
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              placeholder="Ejm. 1er. Semestre 2017"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
          </div>

          {/* FECHA INICIO */}
          <div>
            <label className="text-sm font-medium">Fecha de Inicio</label>
            <input
              type="date"
              name="fechaInicio"
              value={form.fechaInicio}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg"
              required
            />
          </div>

          {/* FECHA FIN */}
          <div>
            <label className="text-sm font-medium">Fecha Final</label>
            <input
              type="date"
              name="fechaFin"
              value={form.fechaFin}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg"
              required
            />
          </div>

          {/* BOTONES */}
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Crear Informe
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}