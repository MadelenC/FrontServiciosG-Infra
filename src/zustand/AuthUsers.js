import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export const useAuthStore = create(
  devtools(
    persist(
      (set,get) => ({
        user: null,
        token: null,

        
        setUser: (user) => set({ user }),

      
        setToken: (token) => set({ token }),

      
        updateUser: (data) =>
          set({
            user: {
              ...get().user,
              ...data,
            },
          }),

        logout: () => set({ user: null, token: null }),
      }),
      {
        name: "auth-storage",
      }
    )
  )
);

