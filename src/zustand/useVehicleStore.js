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
  asientos: v.pasajeros,
  tipo: v.tipog,
  kilometraje: v.modelos && v.modelos.length > 0 ? v.modelos[0].kilometraje : "—",
  estado: v.estado,
  // Datos de marca
  marca: v.marca ?? "—",
  chasis: v.chasis ?? "—",
  motor: v.motor ?? "—",
  cilindrada: v.cilindrada ?? "—",
});


const mapVehicleToApi = (v) => ({
  codigo: v.asignacion,
  placa: v.placa,
  pasajeros: v.asientos,
  tipog: v.tipo,
  kilometraje: v.kilometraje,
  estado: v.estado,
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



