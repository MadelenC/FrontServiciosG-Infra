import api from "../helpers/axiosClient";

// Traer todas las salidas
export const getDepartures = async () => {
  try {
    const response = await api.get("/salidas");
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al obtener las salidas";
  }
};

// Traer una salida por ID
export const getDepartureById = async (id) => {
  try {
    const response = await api.get(`/salidas/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al obtener la salida";
  }
};

// Crear una salida
export const createDeparture = async (data) => {
  try {
    const response = await api.post("/salidas", data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al crear la salida";
  }
};

// Actualizar una salida
export const updateDeparture = async (id, data) => {
  try {
    const response = await api.put(`/salidas/${id}`, data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al actualizar la salida";
  }
};

// Eliminar una salida
export const deleteDeparture = async (id) => {
  try {
    const response = await api.delete(`/salidas/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al eliminar la salida";
  }
};