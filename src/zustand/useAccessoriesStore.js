// src/zustand/useAccessoryStore.js
import { create } from "zustand";

export const useAccessoriesStore = create((set) => ({
  accessories: [],            
  loading: false,             
  error: null,                

  // Función para traer todos los accesorios
  fetchAccessories: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/accessorios"); // tu endpoint para accesorios
      if (!res.ok) throw new Error("Error al cargar accesorios");
      const data = await res.json();
      set({ accessories: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Opcional: agregar un accesorio
  addAccessory: async (newAcc) => {
    try {
      const res = await fetch("/api/accessorios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAcc),
      });
      if (!res.ok) throw new Error("Error al crear accesorio");
      const created = await res.json();
      set((state) => ({ accessories: [...state.accessories, created] }));
    } catch (err) {
      set({ error: err.message });
    }
  },
}));