import { create } from "zustand";
import { 
  getReservas, 
  createReserva, 
  updateReserva, 
  deleteReserva 
} from "../services/reservationsService"; 

export const useReservaStore = create((set, get) => ({
  reservas: [],
  loading: false,
  error: null,

  // Traer todas las reservas
  fetchReservas: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getReservas();
      set({ reservas: data, loading: false });
    } catch (err) {
      set({ error: err.message || err, loading: false });
    }
  },

  // Crear nueva reserva
  addReserva: async (data) => {
    try {
      const newReserva = await createReserva(data);
      set({ reservas: [...get().reservas, newReserva] });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  // Editar reserva existente
  editReserva: async (id, data) => {
    try {
      const updated = await updateReserva(id, data);
      set({
        reservas: get().reservas.map(r => r.id === id ? updated : r)
      });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  // Eliminar reserva
  removeReserva: async (id) => {
    try {
      await deleteReserva(id);
      set({ reservas: get().reservas.filter(r => r.id !== id) });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  }
}));