import { create } from "zustand";
import {
  getRequests,
  getRequestById,
  createRequest,
  updateRequest,
  deleteRequest,
} from "../services/materialOrderService";

export const useMaterialOrderStore = create((set, get) => ({
  requests: [],
  currentRequest: null,
  loading: false,
  error: null,

  // 🔹 Obtener todas las peticiones
  fetchRequests: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getRequests();

      const mapped = data.map((r) => ({
        id: r.id,
        orden: r.orden,
        fecha: r.fecha,
        cantidad: r.cantidad,
        nombre: r.nombre,
        descripcion: r.descripcion,
        insertador: r.insertador,
        observacion: r.observacion,
        justificacion: r.justificacion,

        cantidad1: r.cantidad1,
        medida1: r.medida1,
        descripcion1: r.descripcion1,
        cantidad2: r.cantidad2,
        medida2: r.medida2,
        descripcion2: r.descripcion2,
        cantidad3: r.cantidad3,
        medida3: r.medida3,
        descripcion3: r.descripcion3,
        cantidad4: r.cantidad4,
        medida4: r.medida4,
        descripcion4: r.descripcion4,
        cantidad5: r.cantidad5,
        medida5: r.medida5,
        descripcion5: r.descripcion5,
        cantidad6: r.cantidad6,
        medida6: r.medida6,
        descripcion6: r.descripcion6,
        cantidad7: r.cantidad7,
        medida7: r.medida7,
        descripcion7: r.descripcion7,
        cantidad8: r.cantidad8,
        medida8: r.medida8,
        descripcion8: r.descripcion8,
        cantidad9: r.cantidad9,
        medida9: r.medida9,
        descripcion9: r.descripcion9,
        cantidad10: r.cantidad10,
        medida10: r.medida10,
        descripcion10: r.descripcion10,
        cantidad11: r.cantidad11,
        medida11: r.medida11,
        descripcion11: r.descripcion11,

        km: r.km,
        respuestas: r.respuestas,
        conteo: r.conteo,
        idh: r.idh,

        solicitud: r.solicitud || null, 
        created_at: r.created_at,
        updated_at: r.updated_at,
      }));

      set({ requests: mapped, loading: false });
    } catch (err) {
      set({ error: err.message || err, loading: false });
    }
  },

  // 🔹 Obtener una petición por ID
  fetchRequestById: async (id) => {
    set({ loading: true, error: null });
    try {
      const r = await getRequestById(id);

      const mapped = {
        id: r.id,
        orden: r.orden,
        fecha: r.fecha,
        cantidad: r.cantidad,
        nombre: r.nombre,
        descripcion: r.descripcion,
        insertador: r.insertador,
        observacion: r.observacion,
        justificacion: r.justificacion,

        cantidad1: r.cantidad1,
        medida1: r.medida1,
        descripcion1: r.descripcion1,
        cantidad2: r.cantidad2,
        medida2: r.medida2,
        descripcion2: r.descripcion2,
        cantidad3: r.cantidad3,
        medida3: r.medida3,
        descripcion3: r.descripcion3,
        cantidad4: r.cantidad4,
        medida4: r.medida4,
        descripcion4: r.descripcion4,
        cantidad5: r.cantidad5,
        medida5: r.medida5,
        descripcion5: r.descripcion5,
        cantidad6: r.cantidad6,
        medida6: r.medida6,
        descripcion6: r.descripcion6,
        cantidad7: r.cantidad7,
        medida7: r.medida7,
        descripcion7: r.descripcion7,
        cantidad8: r.cantidad8,
        medida8: r.medida8,
        descripcion8: r.descripcion8,
        cantidad9: r.cantidad9,
        medida9: r.medida9,
        descripcion9: r.descripcion9,
        cantidad10: r.cantidad10,
        medida10: r.medida10,
        descripcion10: r.descripcion10,
        cantidad11: r.cantidad11,
        medida11: r.medida11,
        descripcion11: r.descripcion11,

        km: r.km,
        respuestas: r.respuestas,
        conteo: r.conteo,
        idh: r.idh,

        solicitud: r.solicitud || null,

        created_at: r.created_at,
        updated_at: r.updated_at,
      };

      set({ currentRequest: mapped, loading: false });
    } catch (err) {
      set({ error: err.message || err, loading: false });
    }
  },

  // 🔹 Crear petición
  addRequest: async (data) => {
    try {
      const newRequest = await createRequest(data);

      set({ requests: [...get().requests, newRequest] });

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  // 🔹 Editar petición
  editRequest: async (id, data) => {
    try {
      const updated = await updateRequest(id, data);

      set({
        requests: get().requests.map((r) => (r.id === id ? updated : r)),
        currentRequest:
          get().currentRequest?.id === id ? updated : get().currentRequest,
      });

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  // 🔹 Eliminar petición
  removeRequest: async (id) => {
    try {
      await deleteRequest(id);

      set({
        requests: get().requests.filter((r) => r.id !== id),
      });

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  // 🔹 Limpiar selección actual
  clearCurrentRequest: () => set({ currentRequest: null }),

  // 🔹 Reset total del store
  reset: () =>
    set({
      requests: [],
      currentRequest: null,
      loading: false,
      error: null,
    }),
}));