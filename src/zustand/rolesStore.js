import { create } from "zustand";

export const useRoleStore = create((set) => ({
  roles: ["administrador", "enargados", "mantenimiento", "mensajero", "m. general", "electricista","sergeneral",
    "carpintero","albañil", "plomero", "jardineria", "mecanico"],

  // Acción para actualizar roles dinámicamente
  setRoles: (newRoles) => set({ roles: newRoles }),
}));
