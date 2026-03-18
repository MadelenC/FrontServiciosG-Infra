// src/store/userTravelBudgetsStore.js
import { create } from "zustand";
import {
  getBudgets,
  createBudget,
  updateBudget,
  deleteBudget
} from "../services/TravelBudgetsService.js";

export const useTravelBudgetsStore = create((set, get) => ({
  budgets: [],
  loading: false,
  error: null,

  // Traer todos los presupuestos
  fetchBudgets: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getBudgets();
      set({ budgets: data, loading: false });
    } catch (err) {
      set({ error: err.message || err, loading: false });
    }
  },

  // Crear un nuevo presupuesto
  addBudget: async (data) => {
    try {
      const newBudget = await createBudget(data);
      set({ budgets: [...get().budgets, newBudget] });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  // Editar un presupuesto existente
  editBudget: async (id, data) => {
    try {
      const updated = await updateBudget(id, data);
      set({
        budgets: get().budgets.map((b) => (b.id === id ? updated : b))
      });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  // Eliminar un presupuesto
  removeBudget: async (id) => {
    try {
      await deleteBudget(id);
      set({ budgets: get().budgets.filter((b) => b.id !== id) });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  }
}));