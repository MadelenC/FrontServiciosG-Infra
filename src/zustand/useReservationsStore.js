import { create } from "zustand";
import { getReservas, createReserva, updateReserva, deleteReserva } from "../services/reservationsService";

export const useReservaStore = create((set, get) => ({
  reservas: [],
  loading: false,
  error: null,

  fetchReservas: async () => {
    set({ loading: true, error: null });
    const response = await getReservas();
    if (response.ok) {
      set({ reservas: response.data, loading: false });
    } else {
      set({ error: response.error, loading: false });
    }
  },

  addReserva: async (data) => {
    const response = await createReserva(data);
    if (response.ok) {
      set({ reservas: [...get().reservas, response.data] });
      return { ok: true };
    } else {
      return { ok: false, error: response.error };
    }
  },

  editReserva: async (id, data) => {
    const response = await updateReserva(id, data);
    if (response.ok) {
      set({
        reservas: get().reservas.map(r => r.id === id ? response.data : r),
      });
      return { ok: true };
    } else {
      return { ok: false, error: response.error };
    }
  },

  removeReserva: async (id) => {
    const response = await deleteReserva(id);
    if (response.ok) {
      set({ reservas: get().reservas.filter(r => r.id !== id) });
      return { ok: true };
    } else {
      return { ok: false, error: response.error };
    }
  },
}));