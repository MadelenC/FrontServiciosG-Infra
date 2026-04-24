import { useState } from "react";

export default function WorkRechForm({ onSubmit, onClose }) {

  const [informe, setInforme] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!informe.trim()) return;

    try {
      setLoading(true);

      await onSubmit?.({
        informe,
      });

      setInforme("");

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 w-full max-w-md">

      {/* Título */}
      <h2 className="text-lg font-bold mb-4 text-gray-800">
        Informe de trabajo aceptado
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Campo informe */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Informe de trabajo:
          </label>

          <textarea
            value={informe}
            onChange={(e) => setInforme(e.target.value)}
            rows={5}
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Escribe el informe del trabajo rechazado..."
          />
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-2">

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Registrando..." : "Registrar"}
          </button>

        </div>

      </form>
    </div>
  );
}