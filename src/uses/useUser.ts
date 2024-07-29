import { reactive } from "@vue/reactivity";
import { LoginService } from '../services/index.service'
import { User } from "../types";
import useFlash from "./useFlash";

const state = reactive<{
    error: string | null;
    loading: boolean;
    user: User
}>({
    error: null,
    loading: false,
    user: {
        userName: '',
        password: '',
    }
});

const { showFlash } = useFlash();

export default function useUser(){
    async function Login(user: User){
        try{
            let response = await LoginService(user);
            if(response.status === 201){
                showFlash('Login success')
                return response;
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