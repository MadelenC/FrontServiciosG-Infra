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

  // 🔹 Traer todos los informes
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

  // 🔹 Crear informe
  addTripReport: async (data) => {
    try {
      const newReport = await createTripReport(data);

      const mapped = {
        id: newReport.id,
        vehiculo: newReport.vehiculo,
        chofer: newReport.chofer,
        encargado: newReport.encargado,
        fechapartida: newReport.fechapartida,
        tiempopartida: newReport.tiempopartida,
        kilopartida: newReport.kilopartida,
      };

      set({
        tripReports: [...get().tripReports, mapped],
      });

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  // 🔹 Editar informe
  editTripReport: async (id, data) => {
    try {
      const updated = await updateTripReport(id, data);

      const mapped = {
        id: updated.id,
        vehiculo: updated.vehiculo,
        chofer: updated.chofer,
        encargado: updated.encargado,
        fechapartida: updated.fechapartida,
        tiempopartida: updated.tiempopartida,
        kilopartida: updated.kilopartida,
      };

      set({
        tripReports: get().tripReports.map((r) =>
          r.id === id ? mapped : r
        ),
      });

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  // 🔹 Eliminar informe
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