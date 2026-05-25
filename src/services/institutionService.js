import api from "../helpers/axiosClient";


export const getInstitutions = async ({
  page,
  limit,
  search,
  institution,
}) => {

  try {

    const response =
      await api.get(
        "/institucion",
        {

          params: {

            page,

            limit,

            search,

            institution,

          },

        }
      );

    return response.data;

  } catch (err) {

    throw (
      err.response?.data?.message
      || "Error al obtener instituciones"
    );

  }

};


export const getInstitutionById = async (id) => {
  try {
    const response = await api.get(`/institucion/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al obtener la institución";
  }
};


export const createInstitution = async (data) => {
  try {
    const response = await api.post("/institucion", data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al crear la institución";
  }
};


export const updateInstitution = async (id, data) => {
  try {
    const response = await api.put(`/institucion/${id}`, data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al actualizar la institución";
  }
};


export const deleteInstitution = async (id) => {
  try {
    const response = await api.delete(`/institucion/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al eliminar la institución";
  }
};