import api from "../helpers/axiosClient";

// 🔹 Traer todos los mantenimientos
export const getMaintenances = async () => {
  try {
    const response = await api.get("/mantenimiento");
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al obtener los mantenimientos";
  }
};

// 🔹 Traer un mantenimiento por ID
export const getMaintenanceById = async (id) => {
  try {
    const response = await api.get(`/mantenimiento/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al obtener el mantenimiento";
  }
};

// 🔹 Crear mantenimiento
export const createMaintenance = async (data) => {
  try {
    const response = await api.post("/mantenimiento", data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al crear el mantenimiento";
  }
};

// 🔹 Actualizar mantenimiento
export const updateMaintenance = async (id, data) => {
  try {
    const response = await api.put(`/mantenimiento/${id}`, data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al actualizar el mantenimiento";
  }
};

// 🔹 Eliminar mantenimiento
export const deleteMaintenance = async (id) => {
  try {
    const response = await api.delete(`/mantenimiento/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al eliminar el mantenimiento";
  }
};