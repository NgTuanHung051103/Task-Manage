import { reactive } from "@vue/reactivity";
import { LoginService } from '../services/index.service'
import { User } from "../types";
import useFlash from "./useFlash";

const state = reactive<{
    error: string | boolean | null;
    loading: boolean;
    user: User
}>({
    error: null,
    loading: false,
    user: {
        id: '',
        userName: '',
        password: '',
    }
});

const { showFlash } = useFlash();

export default function useUser(){
    async function Login(user: User){
        try{
            let response = await LoginService(user);
            
            if(response.status === 200 && response.data.length > 0){
                showFlash('Login success')
                state.error = false;
                state.user = response.data[0];
                return response.data[0];
            }
        } catch (e: any){
            state.error = e;
        }
    }

    return {
        Login,
        state
    }
}