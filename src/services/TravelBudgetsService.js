// src/services/budgetsService.js
import api from "../helpers/axiosClient.js";

// Traer todos los presupuestos
export const getBudgets = async () => {
  try {
    const response = await api.get("/presupuestos");
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al obtener presupuestos";
  }
};

// Traer presupuesto por ID
export const getBudgetById = async (id) => {
  try {
    const response = await api.get(`/presupuestos/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al obtener el presupuesto";
  }
};

// Crear un nuevo presupuesto
export const createBudget = async (data) => {
  try {
    const response = await api.post("/presupuestos", data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al crear presupuesto";
  }
};

// Actualizar presupuesto existente
export const updateBudget = async (id, data) => {
  try {
    const response = await api.put(`/presupuestos/${id}`, data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al actualizar presupuesto";
  }
};

// Eliminar presupuesto
export const deleteBudget = async (id) => {
  try {
    const response = await api.delete(`/presupuestos${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al eliminar presupuesto";
  }
};