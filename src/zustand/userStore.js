import { create } from "zustand";

import {
  getUsers,
  createUser,
  updateUser as updateUserService,
  deleteUser,
} from "../services/userService";

export const useUserStore =
  create((set, get) => ({
    users: [],
    loading: true,
    error: null,
    page: 1,
    limit: 8,
    totalPages: 1,
    search: "",
    roleFilter: "",
    fetchUsers: async () => {
      set({
        loading: true,
        error: null,
      });
      try {
        const {
          page,
          limit,
          search,
          roleFilter,
        } = get();

        const data =
          await getUsers({
            page,
            limit,
            search,
            roleFilter,
          });
        set({
          users:
            data.users || [],
          totalPages:
            data.totalPages || 1,
          loading: false,
        });
      } catch (err) {

        set({

          error:
            err.message
            || "Error al cargar usuarios",

          loading: false,

        });

      }

    },
    fetchUsersReport: async (tipo = "") => {

  try {

    const data =
      await getUsers({
        page: 1,
        limit: 10000,
        search: "",
        roleFilter: tipo,
      });

    return data.users || [];

  } catch (err) {

    console.log(err);

    return [];

  }

},


  createUser: async (userData) => {
    try {
      const exists = get().users.some(
        (u) =>
          String(u.cedula).trim() ===
          String(userData.cedula).trim()
      );

      if (exists) {
        return { ok: false, error: "La cédula ya está registrada" };
      }

      const newUser = await createUser(userData);

      set({
        users: [...get().users, newUser],
      });

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

updateUser: async (id, updatedData) => {
  try {
    const response = await updateUserService(id, updatedData);

    await get().fetchUsers();

    return {
      ok: true,
      data: response ?? null,
      error: null
    };

  } catch (err) {
    return {
      ok: false,
      data: null,
      error: err?.response?.data?.message || err.message || "Error al actualizar"
    };
  }
},

  deleteUser: async (id) => {
    try {
      await deleteUser(id);

      set({
        users: get().users.filter((u) => u.id !== id),
      });

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  setPage: (page) => set({ page }),
  setSearch: (term) => set({ search: term || "", page: 1 }),
  setRoleFilter: (role) => set({ roleFilter: role || "", page: 1 }),
}));






