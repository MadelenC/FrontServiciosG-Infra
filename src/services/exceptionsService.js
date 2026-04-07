import api from "../helpers/axiosClient";

// 🔹 Traer todas las excepciones
export const getExceptions = async () => {
  try {
    const response = await api.get("/excepciones");
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al obtener las excepciones";
  }
};

// 🔹 Traer una excepción por ID
export const getExceptionById = async (id) => {
  try {
    const response = await api.get(`/excepciones/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al obtener la excepción";
  }
};

// 🔹 Crear excepción
export const createException = async (data) => {
  try {
    const response = await api.post("/excepciones", data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al crear la excepción";
  }
};

// 🔹 Actualizar excepción
export const updateException = async (id, data) => {
  try {
    const response = await api.put(`/excepciones/${id}`, data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al actualizar la excepción";
  }
};

// 🔹 Eliminar excepción
export const deleteException = async (id) => {
  try {
    const response = await api.delete(`/excepciones/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al eliminar la excepción";
  }
};