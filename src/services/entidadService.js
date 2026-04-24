import api from "../helpers/axiosClient";

// Traer todas las entidades
export const getEntidades = async () => {
  try {
    const response = await api.get("/entidades");
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al obtener entidades";
  }
};

// Crear entidad
export const createEntidad = async (data) => {
  try {
    const response = await api.post("/entidades", data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al crear entidad";
  }
};

// Actualizar entidad
export const updateEntidad = async (id, data) => {
  try {
    const response = await api.put(`/entidades/${id}`, data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al actualizar entidad";
  }
};

// Eliminar entidad
export const deleteEntidad = async (id) => {
  try {
    const response = await api.delete(`/entidades/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al eliminar entidad";
  }
};
