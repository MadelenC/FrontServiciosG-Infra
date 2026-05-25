import { create } from "zustand";
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../services/OrderApprovalService";


export const useOrderApprovalStore = create((set, get) => ({
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
  page: 1,
  limit: 8,
  totalPages: 1,

  search: "",
  taller: "",
  institution: "",


  fetchOrders: async () => {
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
    } = get();
    const data =
      await getOrders({
        page,
        limit,
        search,
        taller,
        institution,
      });
    const mapped =
      data.orders.map((o) => ({
        id: o.id,
        man_id: o.man_id,
        ins_id: o.ins_id,
        taller: o.taller,
        estado: o.estado,
        aprobacion: o.aprobacion,
        encargado: o.encargado,
        jefe: o.jefe,
        user_id: o.user_id,
        descripcion: o.descripcion,
        created_at: o.created_at,
        updated_at: o.updated_at,
      }));
    set({
      orders: mapped,
      totalPages: data.totalPages || 1,
      loading: false,
    });
  } catch (err) {
    set({
      error: err.message || err,
      loading: false,
    });

  }

},

  
  fetchOrderById: async (id) => {
    set({ loading: true, error: null });

    try {
      const o = await getOrderById(id);

      const mapped = {
        id: o.id,
        man_id: o.man_id,
        ins_id: o.ins_id,
        taller: o.taller,

        estado: o.estado,
        aprobacion: o.aprobacion,

        encargado: o.encargado,
        jefe: o.jefe,

        user_id: o.user_id,

        created_at: o.created_at,
        updated_at: o.updated_at,
      };

      set({ currentOrder: mapped, loading: false });
    } catch (err) {
      set({ error: err.message || err, loading: false });
    }
  },

 
  addOrder: async (data) => {
    try {
      const newOrder = await createOrder(data);

      set({ orders: [...get().orders, newOrder] });

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

 
editOrder: async (id, data) => {
  await updateOrder(id, data);

  set({
    orders: get().orders.map((o) =>
      o.id === id
        ? { ...o, ...data }
        : o
    ),
  });
},

 
  removeOrder: async (id) => {
    try {
      await deleteOrder(id);

      set({
        orders: get().orders.filter((o) => o.id !== id),
      });

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },


  clearCurrentOrder: () => set({ currentOrder: null }),

  reset: () =>
    set({
      orders: [],
      currentOrder: null,
      loading: false,
      error: null,
    }),

    setPage: (page) =>
  set({ page }),

setSearch: (search) =>
  set({
    search,
    page: 1,
  }),

setTaller: (taller) =>
  set({
    taller,
    page: 1,
  }),

setInstitution: (institution) =>
  set({
    institution,
    page: 1,
  }),
}));