import api from "../helpers/axiosClient";

// 🔹 Traer todas las instituciones
export const getInstitutions = async () => {
  try {
    const response = await api.get("/institucion");
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al obtener las instituciones";
  }
};

// 🔹 Traer una institución por ID
export const getInstitutionById = async (id) => {
  try {
    const response = await api.get(`/institucion/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al obtener la institución";
  }
};

// 🔹 Crear institución
export const createInstitution = async (data) => {
  try {
    const response = await api.post("/institucion", data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al crear la institución";
  }
};

// 🔹 Actualizar institución
export const updateInstitution = async (id, data) => {
  try {
    const response = await api.put(`/institucion/${id}`, data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al actualizar la institución";
  }
};

// 🔹 Eliminar institución
export const deleteInstitution = async (id) => {
  try {
    const response = await api.delete(`/institucion/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al eliminar la institución";
  }
};