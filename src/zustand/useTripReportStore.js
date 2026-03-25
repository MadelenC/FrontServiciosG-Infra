import { create } from "zustand";
import {
  getTripReports,
  createTripReport,
  updateTripReport,
  deleteTripReport,
} from "../services/TripReportService";

export const useTripReportStore = create((set, get) => ({
  tripReports: [],
  loading: false,
  error: null,

  //TRAER TODOS
  fetchTripReports: async () => {
    set({ loading: true, error: null });

    try {
      const data = await getTripReports();

      const mapped = data.map((r) => ({
        id: r.id,
        vehiculo: r.vehiculo,
        chofer: r.chofer,
        encargado: r.encargado,

        entidad: r.entidad,

        fechapartida: r.fechapartida,
        tiempopartida: r.tiempopartida,
        kilopartida: r.kilopartida,

        fechallegada: r.fechallegada,
        tiempollegada: r.tiempollegada,
        kilollegada: r.kilollegada,

        kmtotal: r.kmtotal,

        viaticoa: r.viaticoa,
        viaticob: r.viaticob,
        viaticoc: r.viaticoc,

        pasajeros: r.pasajeros,
        dias: r.dias,

        recargue1: r.recargue1,
        compra1: r.compra1,
        recargue2: r.recargue2,
        compra2: r.compra2,
        recargue3: r.recargue3,
        compra3: r.compra3,

        combustotalu: r.combustotalu,
        combustotalco: r.combustotalco,

        descripe: r.descripe,
        montope: r.montope,
        montoim: r.montoim,
        totalpeim: r.totalpeim,

        delegacion: r.delegacion,
        descripmante: r.descripmante,
        recomendacion: r.recomendacion,
      }));

      set({ tripReports: mapped, loading: false });

    } catch (err) {
      set({ error: err.message || err, loading: false });
    }
  },

  // CREAR
  addTripReport: async (data) => {
    try {
      const newReport = await createTripReport(data);

      set({
        tripReports: [...get().tripReports, newReport],
      });

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  // EDITAR 
  editTripReport: async (id, data) => {
    try {
      const updated = await updateTripReport(id, data);

      set({
        tripReports: get().tripReports.map((r) =>
          r.id === id
            ? {
                ...r,
                ...updated,
              }
            : r
        ),
      });

      return { ok: true };

    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  // 🔹 ELIMINAR
  removeTripReport: async (id) => {
    try {
      await deleteTripReport(id);

      set({
        tripReports: get().tripReports.filter((r) => r.id !== id),
      });

      return { ok: true };

    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },
}));