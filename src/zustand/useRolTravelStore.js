import { create } from "zustand";
import { getRolTravels, createRolTravel, updateRolTravel, deleteRolTravel } from "../services/rolTravelService";

// 🔹 Función auxiliar para asignar displayId consecutivo
function assignDisplayId(arr) {
  return arr.map((item, index) => ({
    ...item,
    displayId: index + 1, // Numeración consecutiva para mostrar en la UI
  }));
}

export const useRolTravelStore = create((set, get) => ({
  rolTravels: [],
  loading: false,
  error: null,

  // 🔹 Cargar todos los viajes
  fetchRolTravels: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getRolTravels();

      // Mapear correctamente los viajes
      const mapped = data.map(v => ({
        id: v.id, // ID real para operaciones
        chofer: v.user?.nombres + " " + v.user?.apellidos || "Desconocido",
        chofer_id: v.user?.id,
        tipoA: v.tipoa,
        tipoB: v.tipob,
        tipoC: v.tipoc,
        cantidad: v.cantidad,
        fecha: v.fecha,
        exceptions: v.exceptions || [],
      }));

      set({ rolTravels: assignDisplayId(mapped), loading: false });
    } catch (err) {
      set({ error: err.message || err, loading: false });
    }
  },

  //  Agregar un nuevo viaje (al final)
  addRolTravel: async (data) => {
    try {
      const newTravel = await createRolTravel(data);

      const mappedNew = {
        id: newTravel.id,
        chofer: newTravel.user?.nombres + " " + newTravel.user?.apellidos || "Desconocido",
        chofer_id: newTravel.user?.id,
        tipoA: newTravel.tipoa,
        tipoB: newTravel.tipob,
        tipoC: newTravel.tipoc,
        cantidad: newTravel.cantidad,
        fecha: newTravel.fecha,
        exceptions: newTravel.exceptions || [],
      };

      const updatedRolTravels = assignDisplayId([...get().rolTravels, mappedNew]);
      set({ rolTravels: updatedRolTravels });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  // 🔹 Editar un viaje existente (manteniendo orden)
  editRolTravel: async (id, data) => {
    try {
      const updated = await updateRolTravel(id, data);

      const mappedUpdated = {
        id: updated.id,
        chofer: updated.user?.nombres + " " + updated.user?.apellidos || "Desconocido",
        chofer_id: updated.user?.id,
        tipoA: updated.tipoa,
        tipoB: updated.tipob,
        tipoC: updated.tipoc,
        cantidad: updated.cantidad,
        fecha: updated.fecha,
        exceptions: updated.exceptions || [],
      };

      const newList = get().rolTravels.map(v => (v.id === id ? mappedUpdated : v));
      set({ rolTravels: assignDisplayId(newList) });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  // 🔹 Eliminar un viaje
  removeRolTravel: async (id) => {
    try {
      await deleteRolTravel(id);

      const filtered = get().rolTravels.filter(v => v.id !== id);
      set({ rolTravels: assignDisplayId(filtered) });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },
}));

