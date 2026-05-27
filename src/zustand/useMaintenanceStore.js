import { create } from "zustand";

import {
  getMaintenances,
  getTalleres,
  createMaintenance,
  updateMaintenance,
  deleteMaintenance,
} from "../services/maintenanceService";

export const useMaintenanceStore =
  create((set, get) => ({

    maintenances: [],
    talleres: [],
    allTalleres: [],
    loading: false,
    error: null,
    page: 1,
    limit: 8,
    totalPages: 1,
    search: "",
    taller: "",
    institution: "",
    aprobacion: "",
    fetchMaintenances: async (filters = {}) => {

      set({
        loading: true,
        error: null,
      });

      try {
        const {
  page,
  limit,
  search,
  taller,
  institution,
  aprobacion
} = {
  ...get(),
  ...filters
};
       
        const data =await getMaintenances({page, limit,search,taller,institution, aprobacion });

        set({
          maintenances: data.maintenances || [],
          totalPages: data.totalPages || 1,
          loading: false,
        });
      } catch (err) {
        set({
          error:
            err.message || err,
          loading: false,
        });
      }
    },

fetchTalleres: async () => {

  try {
    const data =  await getTalleres();
    const mapped = data.map((t, index) => ({
        id: index + 1,
        nombre: t.taller,
      }));
    set({talleres: mapped, });
  } catch (err) {
    console.log(err);
  }
},

fetchAllTalleres: async () => {

      try {

        const data =
          await getTalleres();

        const mapped = data.map(
          (t, index) => ({
            id: index + 1,
            nombre: t.taller,
          })
        );

        set({
          allTalleres: mapped,
        });

      } catch (err) {

        console.log(err);

      }

    },

 
    addMaintenance: async (data) => {

      try {

        const newMaintenance =
          await createMaintenance(data);

        set({

          maintenances: [
            ...get().maintenances,
            newMaintenance,
          ],

        });

        return { ok: true };

      } catch (err) {

        return {
          ok: false,
          error: err.message || err,
        };

      }

    },

   
  editMaintenance: async (
  id,
  data
) => {

  try {

    await updateMaintenance(
      id,
      data
    );

    set({

      maintenances:
        get().maintenances.map(
          (m) =>
            m.id === id
              ? {
                  ...m,
                  ...data,
                }
              : m
        ),

    });

    return { ok: true };

  } catch (err) {

    console.log(err);

    return {
      ok: false,
      error:
        err.message || err,
    };

  }

},

   
    removeMaintenance: async (id) => {

      try {

        await deleteMaintenance(id);

        set({

          maintenances:
            get().maintenances.filter(
              (m) => m.id !== id
            ),

        });

        return { ok: true };

      } catch (err) {

        return {
          ok: false,
          error: err.message || err,
        };

      }

    },

    

    setPage: (page) => set({ page }),
    setSearch: (search) =>set({search,  page: 1, }),
    setTaller: (taller) =>set({ taller,  page: 1,}),
    setInstitution: (institution) =>set({ institution, page: 1,  }),
    setAprobacion: (aprobacion) =>
  set({ aprobacion, page: 1 }),

    resetFilters: () =>
  set({
    page: 1,
    search: "",
    taller: "",
    institution: "",
  }),
}));