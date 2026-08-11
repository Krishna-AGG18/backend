import {create} from "zustand";
import {devtools, persist} from 'zustand/middleware';

export const useAuthStore = create(
    devtools(
        persist(
            (set) => ({
                //initial state
                user : null,
                isAuthenticated : false,

                //action
                setLogin : (userData, token) => {
                    localStorage.setItem('accessToken', token);
                    set({ user: userData, isAuthenticated: true });
                },

                setLogout : () =>{
                    localStorage.removeItem('accessToken');
                    set({ user: null, isAuthenticated: false });
                },
                
                updateUser : (newData) => 
                    set((state) => ({user : {...state.user, ...newData}}))
            }),
            {
                name: 'auth-storage',
            }
        )
    )
)