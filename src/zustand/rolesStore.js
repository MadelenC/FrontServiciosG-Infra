import { create } from "zustand";

export const useRoleStore = create((set) => ({
  roles: ["administrador", "encargado", "chofer", "supervisor", "mecanico", "mensajero"],

  // Acción para actualizar roles dinámicamente
  setRoles: (newRoles) => set({ roles: newRoles }),
}));
