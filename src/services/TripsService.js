import api from "../helpers/axiosClient";

// Traer todos los viajes
export const getTrips = async () => {
  try {
    const response = await api.get("/viajes");
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al obtener los viajes";
  }
};

// Traer viaje por ID
export const getTripById = async (id) => {
  try {
    const response = await api.get(`/viajes/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al obtener el viaje";
  }
};

// Crear viaje
export const createTrip = async (data) => {
  try {
    const response = await api.post("/viajes", data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al crear el viaje";
  }
};

// Actualizar viaje
export const updateTrip = async (id, data) => {
  try {
    const response = await api.put(`/viajes/${id}`, data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al actualizar el viaje";
  }
};

// Eliminar viaje
export const deleteTrip = async (id) => {
  try {
    const response = await api.delete(`/viajes/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al eliminar el viaje";
  }
};