// src/services/accessoryService.js
export const accessoriesService = {
  // Obtener todos los accesorios
  getAll: async () => {
    try {
      const res = await fetch("/api/accessories"); // tu endpoint
      if (!res.ok) throw new Error("Error al obtener accesorios");
      return await res.json();
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  // Crear un accesorio nuevo
  create: async (accessory) => {
    try {
      const res = await fetch("/api/accessories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(accessory),
      });
      if (!res.ok) throw new Error("Error al crear accesorio");
      return await res.json();
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  // Actualizar un accesorio existente
  update: async (id, accessory) => {
    try {
      const res = await fetch(`/api/accessories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(accessory),
      });
      if (!res.ok) throw new Error("Error al actualizar accesorio");
      return await res.json();
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  // Eliminar un accesorio
  delete: async (id) => {
    try {
      const res = await fetch(`/api/accessories/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar accesorio");
      return true;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};