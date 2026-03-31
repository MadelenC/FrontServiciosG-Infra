import api from "../helpers/axiosClient";

// Traer todas las solicitudes
export const getApplications = async () => {
  try {
    const response = await api.get("/solicitudes");
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al obtener las solicitudes";
  }
};

// Traer una solicitud por ID
export const getApplicationById = async (id) => {
  try {
    const response = await api.get(`/solicitudes/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al obtener la solicitud";
  }
};

// Crear una solicitud
export const createApplication = async (data) => {
  try {
    const response = await api.post("/solicitudes", data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al crear la solicitud";
  }
};

// Actualizar una solicitud
export const updateApplication = async (id, data) => {
  try {
    const response = await api.put(`/solicitudes/${id}`, data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al actualizar la solicitud";
  }
};

// Eliminar una solicitud
export const deleteApplication = async (id) => {
  try {
    const response = await api.delete(`/solicitudes/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al eliminar la solicitud";
  }
};