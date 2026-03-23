import { create } from "zustand";
import {
  getDepartures,
  createDeparture,
  updateDeparture,
  deleteDeparture,
} from "../services/DepartureAuthorizationService";

export const useDepartureAuthorizationStore = create((set, get) => ({
  departures: [],
  loading: false,
  error: null,

  // 🔹 Traer todas las salidas
  fetchDepartures: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getDepartures();

      const mapped = data.map((d) => ({
        id: d.id,
        lugar: d.lugar,
        motivo: d.motivo,
        responsable: d.responsable,
        hsalida: d.hsalida,
        hllegada: d.hllegada,

        vehiculo: d.vehiculo
          ? {
              id: d.vehiculo.id,
              placa: d.vehiculo.placa,
            }
          : null,

        chofer: d.chofer
          ? {
              id: d.chofer.id,
              nombre: `${d.chofer.nombres} ${d.chofer.apellidos}`,
            }
          : null,
      }));

      set({ departures: mapped, loading: false });
    } catch (err) {
      set({ error: err.message || err, loading: false });
    }
  },

  // 🔹 Crear salida
  addDeparture: async (data) => {
    try {
      const newDeparture = await createDeparture(data);

      const mapped = {
        id: newDeparture.id,
        lugar: newDeparture.lugar,
        motivo: newDeparture.motivo,
        responsable: newDeparture.responsable,
        hsalida: newDeparture.hsalida,
        hllegada: newDeparture.hllegada,
        vehiculo: newDeparture.vehiculo,
        chofer: newDeparture.chofer,
      };

      set({ departures: [...get().departures, mapped] });

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  // 🔹 Editar salida
  editDeparture: async (id, data) => {
    try {
      const payload = {
        lugar: data.lugar,
        motivo: data.motivo,
        responsable: data.responsable,
        hsalida: data.hsalida,
        hllegada: data.hllegada,
        vehiculo: data.vehiculo,
        chofer: data.chofer,
      };

      const updated = await updateDeparture(id, payload);

      const mapped = {
        id: updated.id,
        lugar: updated.lugar,
        motivo: updated.motivo,
        responsable: updated.responsable,
        hsalida: updated.hsalida,
        hllegada: updated.hllegada,
        vehiculo: updated.vehiculo,
        chofer: updated.chofer,
      };

      set({
        departures: get().departures.map((d) =>
          d.id === id ? mapped : d
        ),
      });

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  // 🔹 Eliminar salida
  removeDeparture: async (id) => {
    try {
      await deleteDeparture(id);
      set({
        departures: get().departures.filter((d) => d.id !== id),
      });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },
}));