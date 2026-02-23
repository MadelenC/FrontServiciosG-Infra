import { create } from "zustand";
import { 
  getDestinos, 
  createDestino, 
  updateDestino, 
  deleteDestino 
} from "../services/destinationsService";

export const useDestinoStore = create((set, get) => ({
  destinos: [],
  loading: false,
  error: null,

  // Traer todos los destinos
  fetchDestinos: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getDestinos();
      const mapped = data.map(d => ({
        id: d.id,
        departamentoInicio: d.dep_inicio,
        origen: d.origen,
        ruta: d.ruta,
        destino: d.destino,
        departamentoFinal: d.dep_final,
        distancia: d.kilometraje,
        tiempo: d.tiempo,
      }));
      set({ destinos: mapped, loading: false });
    } catch (err) {
      set({ error: err.message || err, loading: false });
    }
  },

  // Crear un destino
  addDestino: async (data) => {
    try {
      const newDestino = await createDestino(data);
      const mapped = {
        id: newDestino.id,
        departamentoInicio: newDestino.dep_inicio, 
        origen: newDestino.origen,
        ruta: newDestino.ruta,
        destino: newDestino.destino,
        departamentoFinal: newDestino.dep_final,
        distancia: newDestino.kilometraje,
        tiempo: newDestino.tiempo,
      };
      set({ destinos: [...get().destinos, mapped] });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  // Editar un destino
  editDestino: async (id, data) => {
    try {
      const payload = {
        dep_inicio: data.departamentoInicio,
        dep_final: data.departamentoFinal,
        origen: data.origen,
        destino: data.destino,
        ruta: data.ruta,
        kilometraje: data.distancia,
        tiempo: data.tiempo,
      };

      const updated = await updateDestino(id, payload);

      const mapped = {
        id: updated.id,
        departamentoInicio: updated.dep_inicio,
        origen: updated.origen,
        ruta: updated.ruta,
        destino: updated.destino,
        departamentoFinal: updated.dep_final,
        distancia: updated.kilometraje,
        tiempo: updated.tiempo,
      };

      set({
        destinos: get().destinos.map(d => (d.id === id ? mapped : d)),
      });

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  // Eliminar un destino
  removeDestino: async (id) => {
    try {
      await deleteDestino(id);
      set({ destinos: get().destinos.filter(d => d.id !== id) });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },
}));


