import api from "../helpers/axiosClient.js";

// Obtener todos los mecánicos
export const getMechanics = async () => {
  try {
    const response = await api.get("/mecanicos");
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al obtener los mecánicos";
  }
};

// Obtener un mecánico por ID
export const getMechanicById = async (id) => {
  try {
    const response = await api.get(`/mecanicos/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al obtener el mecánico";
  }
};

// Crear un mecánico
export const createMechanic = async (data) => {
  try {
    const response = await api.post("/mecanicos", data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al crear el mecánico";
  }
};

// Actualizar un mecánico
export const updateMechanic = async (id, data) => {
  try {
    const response = await api.put(`/mecanicos/${id}`, data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al actualizar el mecánico";
  }
};

// Eliminar un mecánico
export const deleteMechanic = async (id) => {
  try {
    const response = await api.delete(`/mecanicos/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al eliminar el mecánico";
  }
};