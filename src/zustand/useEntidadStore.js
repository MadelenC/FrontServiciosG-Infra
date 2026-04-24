import { create } from "zustand";
import { getEntidades, createEntidad, updateEntidad, deleteEntidad } from "../services/entidadService";

export const useEntidadStore = create((set, get) => ({
  entidades: [],
  loading: false,
  error: null,

  fetchEntidades: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getEntidades();
      set({ entidades: data, loading: false });
    } catch (err) {
      set({ error: err.message || err, loading: false });
    }
  },

  addEntidad: async (data) => {
    try {
      const newEntidad = await createEntidad(data);
      set({ entidades: [...get().entidades, newEntidad] });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  editEntidad: async (id, data) => {
    try {
      const updated = await updateEntidad(id, data);
      set({
        entidades: get().entidades.map(e => e.id === id ? updated : e)
      });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  removeEntidad: async (id) => {
    try {
      await deleteEntidad(id);
      set({ entidades: get().entidades.filter(e => e.id !== id) });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  }
}));
