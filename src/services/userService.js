import api from "../helpers/axiosClient";


export const getUsers = async ({
  page,
  limit,
  search,
  roleFilter,
}) => {
  try {
    const response = await api.get("/users", {
      params: {
        page,
        limit,
        search,
        role: roleFilter,
      },
    });

    return response.data;
  } catch (err) {
    throw new Error(
      err.response?.data?.message ||
      "Error al obtener usuarios"
    );
  }
};


export const createUser = async (userData) => {
  try {
    const response = await api.post("/users", userData);
    return response.data;
  } catch (err) {
    console.log("CREATE USER ERROR:", err.response?.data || err);

    throw new Error(
      err.response?.data?.message ||
      "Error al crear usuario"
    );
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  } catch (err) {
    console.log("UPDATE USER ERROR:", err.response?.data || err);

    throw new Error(
      err.response?.data?.message ||
      "Error al actualizar usuario"
    );
  }
};


export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (err) {
    console.log("DELETE USER ERROR:", err.response?.data || err);

    throw new Error(
      err.response?.data?.message ||
      "Error al eliminar usuario"
    );
  }
};