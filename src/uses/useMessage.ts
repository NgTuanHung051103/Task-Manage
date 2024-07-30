import { Message } from '../types/index';
import { onFetchMessages } from '../services/message.service';
import { reactive } from "@vue/reactivity";

const state = reactive<{
    error: string | boolean | null;
    loading: boolean;
    messages: Message[]
}>({
    error: null,
    loading: false,
    messages: []
});

export default function useMessages() {
    async function getMessages(taskId: string){
        if(taskId !== ''){
            state.messages= await onFetchMessages(taskId);
        }
    }
    
    return {
        getMessages,
        state
    }
}