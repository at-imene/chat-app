import {create} from 'zustand';
import api from '../lib/axios';

export const useAuthStore = create((set)=>({
    authUser:null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth:true,

    checkAuth: async () => {
        try {
            const response = await api.get('/auth/check');
            if(response.status === 200){
                set({authUser: response.data});
            }
        } catch (error) {
            console.log("erreur in checkAuth", error);
            set({authUser: null});
        }finally{
            set({isCheckingAuth: false});
        }
    }
}));