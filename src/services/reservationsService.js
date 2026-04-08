import api from "../helpers/axiosClient";

// Traer todas las reservas
export const getReservas = async () => {
  try {
    const response = await api.get("/reservas");
    return { ok: true, data: response.data };
  } catch (err) {
    return { ok: false, error: err.response?.data?.message || "Error al obtener reservas" };
  }
};

// Traer reserva por ID
export const getReservaById = async (id) => {
  try {
    const response = await api.get(`/reservas/${id}`);
    return { ok: true, data: response.data };
  } catch (err) {
    return { ok: false, error: err.response?.data?.message || "Error al obtener la reserva" };
  }
};

// Crear reserva
export const createReserva = async (data) => {
  try {
    const response = await api.post("/reservas", data);
    return { ok: true, data: response.data };
  } catch (err) {
    return { ok: false, error: err.response?.data?.message || "Error al crear la reserva" };
  }
};

// Actualizar reserva
export const updateReserva = async (id, data) => {
  try {
    const response = await api.put(`/reservas/${id}`, data);
    return { ok: true, data: response.data };
  } catch (err) {
    return { ok: false, error: err.response?.data?.message || "Error al actualizar la reserva" };
  }
};

// Eliminar reserva
export const deleteReserva = async (id) => {
  try {
    const response = await api.delete(`/reservas/${id}`);
    return { ok: true, data: response.data };
  } catch (err) {
    return { ok: false, error: err.response?.data?.message || "Error al eliminar la reserva" };
  }
};