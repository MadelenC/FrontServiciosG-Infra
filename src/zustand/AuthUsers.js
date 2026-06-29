import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export const useAuthStore = create(
  devtools(
    persist(
      (set,get) => ({
        user: null,
        token: null,
        refreshToken: null,

        
        setUser: (user) => set({ user }),

      
        setToken: (token) => set({ token }),

        setRefreshToken: (refreshToken) => set({ refreshToken }),

        setSession: ({ user, token, refreshToken }) =>
          set({ user, token, refreshToken }),

      
        updateUser: (data) =>
          set({
            user: {
              ...get().user,
              ...data,
            },
          }),

        logout: () =>
          set({
            user: null,
            token: null,
            refreshToken: null,
          }),
      }),
      {
        name: "auth-storage",
      }
    )
  )
);

