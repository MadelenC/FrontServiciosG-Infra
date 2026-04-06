import api from "../helpers/axiosClient";

// Traer todas las devoluciones
export const getRepayments = async () => {
  try {
    const response = await api.get("/returns");
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al obtener las devoluciones";
  }
};

// Traer devolución por ID
export const getRepaymentById = async (id) => {
  try {
    const response = await api.get(`/returns/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al obtener la devolución";
  }
};

// Crear devolución
export const createRepayment = async (data) => {
  try {
    const response = await api.post("/returns", data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al crear la devolución";
  }
};

// Actualizar devolución
export const updateRepayment = async (id, data) => {
  try {
    const response = await api.put(`/returns/${id}`, data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al actualizar la devolución";
  }
};

// Eliminar devolución
export const deleteRepayment = async (id) => {
  try {
    const response = await api.delete(`/returns/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al eliminar la devolución";
  }
};