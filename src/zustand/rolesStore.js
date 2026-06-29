import { create } from "zustand";

export const useRoleStore = create((set) => ({
  roles: ["administradorserv", "encargadoserv", "mantenimiento"],
  setRoles: (newRoles) => set({ roles: newRoles }),
}));
