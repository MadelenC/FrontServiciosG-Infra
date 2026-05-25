import { create } from "zustand";

import { getInstitutions, createInstitution,updateInstitution,deleteInstitution,} from "../services/institutionService";

export const useInstitutionStore =
  create((set, get) => ({
    institutions: [],
    allInstitutions: [],
    loading: false,
    error: null,
    page: 1,
    limit: 8,
    totalPages: 1,
    search: "",
    institution: "",
    fetchAllInstitutions: async () => {

  try {

    const data =await getInstitutions({ page: 1,limit: 9999, });

    set({
      allInstitutions:
        data.institutions || [],

    });

  } catch (err) {

    console.log(err);

  }

},

    fetchInstitutions: async () => {

      set({

        loading: true,

        error: null,

      });

      try {

        const {

          page,

          limit,

          search,

          institution,

        } = get();

        const data =
          await getInstitutions({

            page,

            limit,

            search,

            institution,

          });

        set({

          institutions:
            data.institutions || [],

          totalPages:
            data.totalPages || 1,

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

    addInstitution: async (data) => {

      try {

        await createInstitution(data);

        await get().fetchInstitutions();

        return { ok: true };

      } catch (err) {

        return {

          ok: false,

          error:
            err.message || err,

        };

      }

    },

    editInstitution: async (
      id,
      data
    ) => {

      try {

        await updateInstitution(
          id,
          data
        );

        await get().fetchInstitutions();

        return { ok: true };

      } catch (err) {

        return {

          ok: false,

          error:
            err.message || err,

        };

      }

    },

    removeInstitution: async (id) => {

      try {

        await deleteInstitution(id);

        await get().fetchInstitutions();

        return { ok: true };

      } catch (err) {

        return {

          ok: false,

          error:
            err.message || err,

        };

      }

    },

    setPage: (page) =>
      set({ page }),

    setSearch: (search) =>
      set({
        search,
        page: 1,
      }),

    setInstitution: (
      institution
    ) =>
      set({
        institution,
        page: 1,
      }),

}));