import React, { useState } from "react";

export default function AddDriverForm({ choferes = [], choferesRegistrados = [], onSubmit, onClose }) {
  const [choferId, setChoferId] = useState("");
  const [error, setError] = useState("");

  const inputBase = "p-2 border rounded text-sm w-full";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!choferId) {
      setError("Debe seleccionar un chofer");
      return;
    }
    if (choferesRegistrados.some(c => c.id === parseInt(choferId))) {
      setError("Este chofer ya está registrado");
      return;
    }

    setError("");

    const payload = {
      chofer_id: parseInt(choferId),
      tipoa: "",
      tipob: "",
      tipoc: "",
      cantidad: 1,
      fecha: new Date().toISOString(),
    };

    onSubmit(payload);
    setChoferId(""); 
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-md mx-auto bg-white p-4 rounded-xl shadow"
    >
      <h3 className="text-center font-bold text-gray-600">
        Registrar Chofer al Rol de Viajes
      </h3>

      <div className="flex flex-col">
        <label className="text-gray-600 text-xs">Chofer</label>
        <select
          value={choferId}
          onChange={(e) => setChoferId(e.target.value)}
          className={inputBase}
        >
          <option value="">Seleccione un chofer</option>
          {choferes.map((chofer) => {
            const yaRegistrado = choferesRegistrados.some(c => c.id === chofer.id);
            return (
              <option key={chofer.id} value={chofer.id} disabled={yaRegistrado}>
                {chofer.nombres} {chofer.apellidos} {yaRegistrado ? "(Ya registrado)" : ""}
              </option>
            );
          })}
        </select>

        {error && <span className="text-red-500 text-xs">{error}</span>}
      </div>

      <div className="flex justify-center gap-3 mt-2">
        <button
          type="submit"
          className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Registrar
        </button>

        <button
          type="button"
          onClick={onClose}
          className="px-4 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
