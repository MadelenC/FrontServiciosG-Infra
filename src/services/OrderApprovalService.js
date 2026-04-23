import api from "../helpers/axiosClient";


export const getOrders = async () => {
  try {
    const response = await api.get("/pedidoserv");
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al obtener órdenes";
  }
};


export const getOrderById = async (id) => {
  try {
    const response = await api.get(`/pedidoserv/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al obtener la orden";
  }
};

export const createOrder = async (data) => {
  try {
    const response = await api.post("/pedidoserv", data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al crear la orden";
  }
};


export const updateOrder = async (id, data) => {
  try {
    const response = await api.put(`/pedidoserv/${id}`, data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al actualizar la orden";
  }
};


export const deleteOrder = async (id) => {
  try {
    const response = await api.delete(`/pedidoserv/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al eliminar la orden";
  }
};