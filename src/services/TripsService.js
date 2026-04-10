import api from "../helpers/axiosClient";

// Obtener todos los viajes (FULL)
export const getTrips = async () => {
  try {
    const response = await api.get("/viajes");
    return response.data;
  } catch (err) {
    throw err.response?.data?.error || "Error al obtener los viajes";
  }
};

// Obtener viaje por ID (FULL)
export const getTripById = async (id) => {
  try {
    const response = await api.get(`/viajes/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.error || "Error al obtener el viaje";
  }
};

// Crear viaje completo (FULL)
export const createTrip = async (data) => {
  try {
    const response = await api.post("/viajes", data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.error || "Error al crear el viaje";
  }
};

// Actualizar viaje completo (FULL)
export const updateTrip = async (id, data) => {
  try {
    const response = await api.put(`/viajes/${id}`, data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.error || "Error al actualizar el viaje";
  }
};

// Eliminar viaje completo (FULL)
export const deleteTrip = async (id) => {
  try {
    const response = await api.delete(`/viajes/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.error || "Error al eliminar el viaje";
  }
};