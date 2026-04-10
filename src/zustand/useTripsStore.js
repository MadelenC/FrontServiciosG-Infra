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

  // GET ALL
  fetchTrips: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getTrips();
      set({ trips: data, loading: false });
    } catch (err) {
      set({
        error: err?.message || "Error al cargar viajes",
        loading: false
      });
    }
  },

  // CREATE FULL VIAJE
  addTrip: async (data) => {
    try {
      const newTrip = await createTrip(data);

      set((state) => ({
        trips: [...state.trips, newTrip]
      }));

      return { ok: true, data: newTrip };
    } catch (err) {
      return {
        ok: false,
        error: err?.message || "Error al crear viaje"
      };
    }
  },

  // UPDATE FULL VIAJE
  editTrip: async (id, data) => {
    try {
      const updated = await updateTrip(id, data);

      set((state) => ({
        trips: state.trips.map((t) =>
          t.id === id ? updated : t
        )
      }));

      return { ok: true, data: updated };
    } catch (err) {
      return {
        ok: false,
        error: err?.message || "Error al actualizar viaje"
      };
    }
  },

  // DELETE FULL VIAJE
  removeTrip: async (id) => {
    try {
      await deleteTrip(id);

      set((state) => ({
        trips: state.trips.filter((t) => t.id !== id)
      }));

      return { ok: true };
    } catch (err) {
      return {
        ok: false,
        error: err?.message || "Error al eliminar viaje"
      };
    }
  }
}));