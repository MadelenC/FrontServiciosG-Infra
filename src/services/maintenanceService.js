import api from "../helpers/axiosClient";


export const getMaintenances =
  async (params) => {

    try {

      const response =
        await api.get(
          "/mantenimiento",
          {
            params,
          }
        );

      return response.data;

    } catch (err) {

      throw (
        err.response?.data?.message
        ||
        "Error al obtener mantenimientos"
      );

    }

};

export const getMyInstitutionMaintenances =
  async (params) => {

    try {

      const response =
        await api.get(
          "/mantenimiento/my-institutions",
          {
            params,
          }
        );

      return response.data;

    } catch (err) {

      throw (
        err.response?.data?.message ||
        "Error al obtener mantenimientos"
      );

    }

};
export const getTalleres = async () => {

  try {
    const response =await api.get("/mantenimiento/talleres");
    return response.data;
  } catch (err) {
    throw (
      err.response?.data?.message ||
      "Error al obtener talleres"
    );
  }
};


export const getMaintenanceById = async (id) => {
  try {
    const response = await api.get(`/mantenimiento/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al obtener el mantenimiento";
  }
};

export const createMaintenance = async (data) => {
  try {
    const response = await api.post("/mantenimiento", data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al crear el mantenimiento";
  }
};


export const updateMaintenance = async (id, data) => {
  try {
    const response = await api.put(`/mantenimiento/${id}`, data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al actualizar el mantenimiento";
  }
};


export const deleteMaintenance = async (id) => {
  try {
    const response = await api.delete(`/mantenimiento/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al eliminar el mantenimiento";
  }
};