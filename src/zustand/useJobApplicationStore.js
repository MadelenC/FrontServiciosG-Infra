import { create } from "zustand";
import {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
} from "../services/jobApplicationService";

export const useJobApplicationStore = create((set, get) => ({
  applications: [],
  loading: false,
  error: null,

  // 🔹 Obtener todas las solicitudes
  fetchApplications: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getApplications();

      const mapped = data.map(a => ({
        id: a.id,
        chofer: a.chofer,
        descripcion: a.descripsoli,
        fecha: a.fecha,
        vehiculo: a.vehiculo, // relación
        accesorios: a.accesorios || [],
        createdAt: a.created_at,
        updatedAt: a.updated_at,
      }));

      set({ applications: mapped, loading: false });
    } catch (err) {
      set({ error: err.message || err, loading: false });
    }
  },

  // 🔹 Crear solicitud
  addApplication: async (data) => {
    try {
      const newApp = await createApplication(data);

      const mapped = {
        id: newApp.id,
        chofer: newApp.chofer,
        descripcion: newApp.descripsoli,
        fecha: newApp.fecha,
        vehiculo: newApp.vehiculo,
        accesorios: newApp.accesorios || [],
        createdAt: newApp.created_at,
        updatedAt: newApp.updated_at,
      };

      set({ applications: [...get().applications, mapped] });

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  // 🔹 Editar solicitud
  editApplication: async (id, data) => {
    try {
      const payload = {
        chofer: data.chofer,
        descripsoli: data.descripcion,
        fecha: data.fecha,
        vehiculo_id: data.vehiculo_id, // importante si envías ID
      };

      const updated = await updateApplication(id, payload);

      const mapped = {
        id: updated.id,
        chofer: updated.chofer,
        descripcion: updated.descripsoli,
        fecha: updated.fecha,
        vehiculo: updated.vehiculo,
        accesorios: updated.accesorios || [],
        createdAt: updated.created_at,
        updatedAt: updated.updated_at,
      };

      set({
        applications: get().applications.map(a =>
          a.id === id ? mapped : a
        ),
      });

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  // 🔹 Eliminar solicitud
  removeApplication: async (id) => {
    try {
      await deleteApplication(id);

      set({
        applications: get().applications.filter(a => a.id !== id),
      });

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },
}));