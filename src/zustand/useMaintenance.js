import { create } from "zustand";
import {
  getMaintenances,
  createMaintenance,
  updateMaintenance,
  deleteMaintenance,
} from "../services/maintenanceService";

export const useMaintenanceStore = create((set, get) => ({
  maintenances: [],
  loading: false,
  error: null,

  // 🔹 Obtener todos los mantenimientos
  fetchMaintenances: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getMaintenances();
      const mapped = data.map(m => ({
        id: m.id,
        equipo: m.equipo,
        marca: m.marca,
        modelo: m.modelo,
        numero: m.numero,
        codigo: m.codigo,
        otros: m.otros,
        encar: m.encar,
        taller: m.taller,
        descripcion: m.descripcion,
        aprobacion: m.aprobacion,
        fecha: m.fecha,
        fecha_inicio: m.fecha_inicio,
        fecha_final: m.fecha_final,
        responsable: m.responsable,
        informe: m.informe,
        cumplido: m.cumplido,
        id_nro: m.id_nro,
        user: m.user,
        institucion: m.institucion,
        createdAt: m.created_at,
        updatedAt: m.updated_at,
      }));
      set({ maintenances: mapped, loading: false });
    } catch (err) {
      set({ error: err.message || err, loading: false });
    }
  },

  // 🔹 Crear mantenimiento
  addMaintenance: async (data) => {
    try {
      const newMaintenance = await createMaintenance(data);
      set({ maintenances: [...get().maintenances, newMaintenance] });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  // 🔹 Actualizar mantenimiento
  editMaintenance: async (id, data) => {
    try {
      const updated = await updateMaintenance(id, data);
      set({
        maintenances: get().maintenances.map(m =>
          m.id === id ? updated : m
        ),
      });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  // 🔹 Eliminar mantenimiento
  removeMaintenance: async (id) => {
    try {
      await deleteMaintenance(id);
      set({
        maintenances: get().maintenances.filter(m => m.id !== id),
      });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },
}));