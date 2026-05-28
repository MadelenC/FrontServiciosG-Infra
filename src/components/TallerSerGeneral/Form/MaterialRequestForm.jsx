import React, { useState } from "react";
import { useAuthStore } from "../../../zustand/AuthUsers";
import { toast } from "react-toastify";

const unidadMedidaOptions = [
  "Nulo",
  "Pieza",
  "Litros",
  "Centimetros",
  "Metros",
  "Galones",
  "Valde",
  "Hoja",
  "Pliego",
];

export default function MaterialRequestForm({
  isOpen,
  onClose,
  onSave,
  application,
}) {

  const [items, setItems] = useState([
    { cantidad: "", unidad: "Nulo", descripcion: "" },
  ]);

  const [encargado, setEncargado] = useState("");
  const [jefe, setJefe] = useState("");
  const [saving, setSaving] = useState(false);

  const user = useAuthStore((state) => state.user);

  if (!isOpen) return null;

  const handleAddItem = () => {
    setItems([
      ...items,
      { cantidad: "", unidad: "Nulo", descripcion: "" },
    ]);
  };

  const handleRemoveItem = (index) => {
    if (items.length === 1) return;

    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setSaving(true);

 const payload = {
  man_id: application?.id,

  
  ins_id: application?.institucion?.nombre,

  taller: application?.taller,

  user_id: user?.id,

  encargado: encargado || "",
  jefe: jefe || "",

  aprobacion: "pendiente",
  estado: "activo",
};

  items.forEach((item, index) => {
  const i = index + 1;

  payload[`can${i}`] = item.cantidad?.toString() || "0";
  payload[`uni${i}`] = item.unidad || "Nulo";
  payload[`des${i}`] = item.descripcion || "";
});


  for (let i = items.length + 1; i <= 11; i++) {
    payload[`can${i}`] = "0";
    payload[`uni${i}`] = "0";
    payload[`des${i}`] = "0";
  }
  console.log("Payload enviado:", payload);

  const res = await onSave(payload);
  console.log("RESPUESTA:", res);

  setSaving(false);

  if (res?.ok) {
    toast.success("✅ Petición registrada correctamente");
    onClose();
  } else {
    toast.error(res?.error || "❌ Error al guardar la petición");
  }
};

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-5">

      <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl relative max-h-[90vh] flex flex-col">

       
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 font-bold px-3 py-1 rounded hover:bg-gray-200"
        >
          X
        </button>

        <h2 className="text-2xl font-bold text-center text-gray-700 mt-6 mb-4">
          Realizar petición de material
        </h2>

      
        <div className="flex-1 overflow-y-auto p-6">

          <form onSubmit={handleSubmit} className="space-y-6">

        
            <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">

              <label className="text-green-600 font-semibold block mb-2">
                Sección
              </label>

              <input
                type="text"
                value={application?.institucion?.nombre || ""}
                readOnly
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
              />
            </div>

       
            <div className="overflow-x-auto border border-gray-300 rounded-md bg-blue-50">

              <table className="w-full text-sm border-collapse">

                <thead className="bg-blue-100">

                  <tr>

                    <th className="border border-gray-300 px-3 py-2 text-left">
                      Cantidad
                    </th>

                    <th className="border border-gray-300 px-3 py-2 text-left">
                      Unid./Medida
                    </th>

                    <th className="border border-gray-300 px-3 py-2 text-left">
                      Descripción
                    </th>

                    <th className="border border-gray-300 px-3 py-2 w-12" />

                  </tr>

                </thead>

                <tbody>

                  {items.map((item, i) => (

                    <tr key={i} className="bg-white">

                   
                      <td className="border border-gray-300 px-2 py-1">

                        <input
                          type="number"
                          min="0"
                          value={item.cantidad}
                          onChange={(e) =>
                            handleItemChange(
                              i,
                              "cantidad",
                              e.target.value
                            )
                          }
                          placeholder="Ejm. 1"
                          required
                          className="w-full border border-gray-300 rounded-md px-2 py-1"
                        />

                      </td>

                 
                      <td className="border border-gray-300 px-2 py-1">

                        <select
                          value={item.unidad}
                          onChange={(e) =>
                            handleItemChange(
                              i,
                              "unidad",
                              e.target.value
                            )
                          }
                          required
                          className="w-full border border-gray-300 rounded-md px-2 py-1"
                        >

                          {unidadMedidaOptions.map((opt) => (

                            <option key={opt} value={opt}>
                              {opt}
                            </option>

                          ))}

                        </select>

                      </td>

                      <td className="border border-gray-300 px-2 py-1">

                        <input
                          type="text"
                          value={item.descripcion}
                          onChange={(e) =>
                            handleItemChange(
                              i,
                              "descripcion",
                              e.target.value
                            )
                          }
                          placeholder="Descripción"
                          required
                          className="w-full border border-gray-300 rounded-md px-2 py-1"
                        />

                      </td>

                      
                      <td className="border border-gray-300 px-2 py-1 text-center">

                        {items.length > 1 && (

                          <button
                            type="button"
                            onClick={() => handleRemoveItem(i)}
                            className="text-red-600 font-bold hover:text-red-800"
                          >
                            &times;
                          </button>

                        )}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

             
              <div className="mt-2 flex justify-end">

                <button
                  type="button"
                  onClick={handleAddItem}
                  className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-1 rounded"
                >
                  +
                </button>

              </div>

            </div>

          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-300 rounded-lg p-4 bg-gray-50">

           
              <div>

                <label className="text-green-600 font-semibold block mb-1">
                  Encargado
                </label>

                <input
                  type="text"
                  value={encargado}
                  onChange={(e) => setEncargado(e.target.value)}
                  placeholder="Ingrese encargado"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
                  required
                />

              </div>

              
              <div>

                <label className="text-green-600 font-semibold block mb-1">
                  Jefe de Infraestructura
                </label>

                <input
                  type="text"
                  value={jefe}
                  onChange={(e) => setJefe(e.target.value)}
                  placeholder="Ingrese jefe de infraestructura"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
                  required
                />

              </div>

            </div>

          
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">

              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white px-5 py-2 rounded-md"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={saving}
                className="bg-blue-700 text-white px-5 py-2 rounded-md disabled:opacity-70"
              >
                Registrar
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}