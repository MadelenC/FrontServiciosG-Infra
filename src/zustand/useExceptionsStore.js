import { create } from "zustand";
import {
  getExceptions,
  createException,
  updateException,
  deleteException,
} from "../services/exceptionsService";

export const useExceptionsStore = create((set, get) => ({
  exceptions: [],
  loading: false,
  error: null,

  // 🔹 Obtener todas las excepciones
  fetchExceptions: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getExceptions();

      set({
        exceptions: data, // 👈 guardamos tal como viene
        loading: false,
      });
    } catch (err) {
      set({
        error: err.message || err,
        loading: false,
      });
    }
  },

  // 🔹 Crear excepción
  addException: async (data) => {
    try {
      const newException = await createException(data);

      set({
        exceptions: [...get().exceptions, newException],
      });

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  // 🔹 Editar excepción
  editException: async (id, data) => {
    try {
      const updated = await updateException(id, data);

      set({
        exceptions: get().exceptions.map((e) =>
          e.id === id ? updated : e
        ),
      });

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  // 🔹 Eliminar excepción
  removeException: async (id) => {
    try {
      await deleteException(id);

      set({
        exceptions: get().exceptions.filter((e) => e.id !== id),
      });

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },
}));