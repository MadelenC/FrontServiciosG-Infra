import { create } from "zustand";
import {
  getVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from "../services/vehicleService";


const mapVehicleFromApi = (v) => ({
  id: v.id,
  asignacion: v.codigo,
  placa: v.placa,
  color:v.color,
  asientos: v.pasajeros,
  tipog: v.tipog,
  estado: v.estado,
  combustible: v.combustible ??"",

  modelo:v.modelos?.[0]?.modelo ??"",
  tipoe: v.modelos?.[0]?.tipoe ??"",
  kilometraje: v.modelos && v.modelos.length > 0 ? v.modelos[0].kilometraje : "—",
  
  // Datos de marca
  marca: v.modelos?.[0]?.marcas?.[0]?.marca ?? "",
  chasis: v.modelos?.[0]?.marcas?.[0]?.chasis ?? "",
  motor: v.modelos?.[0]?.marcas?.[0]?.motor ?? "",
  cilindrada: v.modelos?.[0]?.marcas?.[0]?.cilindrada ?? "",
});


const mapVehicleToApi = (v) => ({
  codigo: v.asignadoA,
  placa: v.placa,
  pasajeros: v.pasajeros,
  tipog: v.tipoGeneral,
  kilometraje: v.kilometraje,
  estado: v.estado,
  color: v.color,
  motor: v.motor,
  chasis: v.chasis,
  cilindrada: v.cilindrada,
  marca: v.marca,
  modelo: v.modelo,
  tipoe: v.tipoEspecifico,
});

export const useVehicleStore = create((set, get) => ({
  vehicles: [],
  loading: false,
  error: null,
  fetchVehicles: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getVehicles();
      set({
        vehicles: (data || []).map(mapVehicleFromApi),
        loading: false,
      });
    } catch (err) {
      set({ error: err.message || err, loading: false });
    }
  },

  
  addVehicle: async (vehicleUI) => {
    try {
      await createVehicle(mapVehicleToApi(vehicleUI));
      set({
        vehicles: [
          ...get().vehicles,
          {
            ...vehicleUI,
            id: Date.now(), 
          },
        ],
      });

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },


  editVehicle: async (id, vehicleUI) => {
    try {
      await updateVehicle(id, mapVehicleToApi(vehicleUI));

      set({
        vehicles: get().vehicles.map((v) =>
          v.id === id ? { ...v, ...vehicleUI } : v
        ),
      });

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  
  removeVehicle: async (id) => {
    try {
      await deleteVehicle(id);
      set({
        vehicles: get().vehicles.filter((v) => v.id !== id),
      });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },
}));



