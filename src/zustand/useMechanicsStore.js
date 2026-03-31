import { create } from "zustand";
import { 
  getMechanics, 
  createMechanic, 
  updateMechanic, 
  deleteMechanic 
} from "../services/mechanicsService.js";

export const useMechanicsStore = create((set, get) => ({
  mechanics: [],
  loading: false,
  error: null,

  // Obtener todos los mecánicos
  fetchMechanics: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getMechanics();
      const mapped = data.map(m => ({
        id: m.id,
        fecha: m.fecha,
        cantidad: m.cantidad,
        unidad: m.unidad,
        trabajo: m.trabajo,
        marca: m.marca,
        codigo: m.codigo,
        observacion: m.observacion,
        kilometraje: m.kilometraje,
        insertador: m.insertador,
        solicitud_id: m.solicitud_id,
        solicitud: m.solicitud ? { ...m.solicitud } : null,
        created_at: m.created_at,
        updated_at: m.updated_at,
      }));
      set({ mechanics: mapped, loading: false });
    } catch (err) {
      set({ error: err.message || err, loading: false });
    }
  },

  // Crear un mecánico
  addMechanic: async (data) => {
    try {
      const newMechanic = await createMechanic(data);
      const mapped = {
        id: newMechanic.id,
        fecha: newMechanic.fecha,
        cantidad: newMechanic.cantidad,
        unidad: newMechanic.unidad,
        trabajo: newMechanic.trabajo,
        marca: newMechanic.marca,
        codigo: newMechanic.codigo,
        observacion: newMechanic.observacion,
        kilometraje: newMechanic.kilometraje,
        insertador: newMechanic.insertador,
        solicitud_id: newMechanic.solicitud_id,
        solicitud: newMechanic.solicitud ? { ...newMechanic.solicitud } : null,
        created_at: newMechanic.created_at,
        updated_at: newMechanic.updated_at,
      };
      set({ mechanics: [...get().mechanics, mapped] });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  // Editar un mecánico
  editMechanic: async (id, data) => {
    try {
      const updated = await updateMechanic(id, data);
      const mapped = {
        id: updated.id,
        fecha: updated.fecha,
        cantidad: updated.cantidad,
        unidad: updated.unidad,
        trabajo: updated.trabajo,
        marca: updated.marca,
        codigo: updated.codigo,
        observacion: updated.observacion,
        kilometraje: updated.kilometraje,
        insertador: updated.insertador,
        solicitud_id: updated.solicitud_id,
        solicitud: updated.solicitud ? { ...updated.solicitud } : null,
        created_at: updated.created_at,
        updated_at: updated.updated_at,
      };
      set({
        mechanics: get().mechanics.map(m => (m.id === id ? mapped : m)),
      });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  // Eliminar un mecánico
  removeMechanic: async (id) => {
    try {
      await deleteMechanic(id);
      set({ mechanics: get().mechanics.filter(m => m.id !== id) });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },
}));