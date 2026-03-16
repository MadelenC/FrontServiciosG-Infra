import { create } from "zustand";
import {
  getTrips,
  createTrip,
  updateTrip,
  deleteTrip
} from "../services/TripsService";

export const useTripsStore = create((set, get) => ({
  trips: [],
  loading: false,
  error: null,

  // Obtener todos los viajes
  fetchTrips: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getTrips();
      set({ trips: data, loading: false });
    } catch (err) {
      set({ error: err.message || err, loading: false });
    }
  },

  // Crear viaje
  addTrip: async (data) => {
    try {
      const newTrip = await createTrip(data);
      set({ trips: [...get().trips, newTrip] });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  // Editar viaje
  editTrip: async (id, data) => {
    try {
      const updated = await updateTrip(id, data);

      set({
        trips: get().trips.map((t) =>
          t.id === id ? updated : t
        )
      });

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  // Eliminar viaje
  removeTrip: async (id) => {
    try {
      await deleteTrip(id);

      set({
        trips: get().trips.filter((t) => t.id !== id)
      });

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  }
}));