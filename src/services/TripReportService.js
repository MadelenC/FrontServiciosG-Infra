import api from "../helpers/axiosClient";

export const getTripReports = async () => {
  try {
    const response = await api.get("/informe_viajes");
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al obtener los informes de viajes";
  }
};

export const getTripReportById = async (id) => {
  try {
    const response = await api.get(`/informe_viajes/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al obtener el informe de viaje";
  }
};

export const createTripReport = async (data) => {
  try {
    const response = await api.post("/informe_viajes", data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al crear el informe de viaje";
  }
};

export const updateTripReport = async (id, data) => {
  try {
    const response = await api.put(`/informe_viajes/${id}`, data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al actualizar el informe de viaje";
  }
};

export const deleteTripReport = async (id) => {
  try {
    const response = await api.delete(`/informe_viajes/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al eliminar el informe de viaje";
  }
};