import { create } from "zustand";
import { 
  getApplications, 
  createApplication, 
  updateApplication, 
  deleteApplication 
} from "../services/applicationService";

export const useApplicationsStore = create((set, get) => ({
  applications: [],
  loading: false,
  error: null,

  // Obtener todas las solicitudes
  fetchApplications: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getApplications();
      set({ applications: data, loading: false });
    } catch (err) {
      set({ error: err.message || err, loading: false });
    }
  },

  // Crear una solicitud
  addApplication: async (data) => {
    try {
      const newApp = await createApplication(data);
      set({ applications: [...get().applications, newApp] });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  // Editar una solicitud
  editApplication: async (id, data) => {
    try {
      const updated = await updateApplication(id, data);
      set({
        applications: get().applications.map(a => (a.id === id ? updated : a))
      });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  // Eliminar una solicitud
  removeApplication: async (id) => {
    try {
      await deleteApplication(id);
      set({ applications: get().applications.filter(a => a.id !== id) });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },
}));