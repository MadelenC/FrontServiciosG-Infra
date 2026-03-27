import { create } from "zustand";
import {
  getInstitutions,
  createInstitution,
  updateInstitution,
  deleteInstitution,
} from "../services/institutionService";

export const useInstitutionStore = create((set, get) => ({
  institutions: [],
  loading: false,
  error: null,

  // 🔹 Obtener todas las instituciones
  fetchInstitutions: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getInstitutions();

      // 🔹 Mapeamos para mantener id y nombre
      const mapped = data.map(inst => ({
        id: inst.id,
        nombre: inst.nombre,
      }));

      set({ institutions: mapped, loading: false });
    } catch (err) {
      set({ error: err.message || err, loading: false });
    }
  },

  // 🔹 Crear institución
  addInstitution: async (data) => {
    try {
      const newInstitution = await createInstitution(data);
      const mapped = {
        id: newInstitution.id,
        nombre: newInstitution.nombre,
      };
      set({ institutions: [...get().institutions, mapped] });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  // 🔹 Actualizar institución
  editInstitution: async (id, data) => {
    try {
      const updated = await updateInstitution(id, data);
      const mapped = {
        id: updated.id,
        nombre: updated.nombre,
      };
      set({
        institutions: get().institutions.map(i => (i.id === id ? mapped : i)),
      });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  // 🔹 Eliminar institución
  removeInstitution: async (id) => {
    try {
      await deleteInstitution(id);
      set({
        institutions: get().institutions.filter(i => i.id !== id),
      });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },
}));