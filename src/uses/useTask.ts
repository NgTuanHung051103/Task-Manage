import { AccordionItemsTypes } from './../types/index';
import { reactive } from "@vue/reactivity";
import { dateInPast } from "../utlis/date";
import useFlash from "./useFlash";

import {
    onCompleteTask,
    onCreateNewTask,
    onDeleteTask,
    onFetchTasks,
    onUpdateTask,
} from "../services/index.service";

const state = reactive<{
    error: string | null;
    loading: boolean;
    tasks: AccordionItemsTypes[];
}>({
    error: null,
    loading: false,
    tasks: [],
});

const { showFlash } = useFlash();

export default function useTask(){
    async function completeTask(id: string, status: boolean) {
        await onCompleteTask(id, status);
    }

    async function createNewTask (dto: AccordionItemsTypes) {
        if(dto.title === ''){
            showFlash('Title task is a required field!')
        // } else if ( dateInPast(new Date(dto.dueDate), new Date())){
        //     showFlash("Duedate task is not allow a day in past!");
        } else {
            let response = await onCreateNewTask(dto);
            if(response.status === 201){
                showFlash('Complete creating new task')
                return true;
            }
        }
    }

    async function fetchTasks() {
        state.loading = true;
        try {
            state.tasks = await onFetchTasks();
        } catch (e: any) {
            state.error = e;
        } finally {
            state.loading = false;
        }
    }

    async function updateTask(id: string, dto: AccordionItemsTypes) {
        await onUpdateTask(id, dto);
    }

    async function deleteTask(id: string){
        await onDeleteTask(id);
    }

    return {
        completeTask,
        createNewTask,
        fetchTasks,
        updateTask,
        deleteTask,
        state
    }
}