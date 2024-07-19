<script setup lang="ts">
import { onMounted, ref, computed } from "@vue/runtime-core";
import type { AccordionItemsTypes } from '../../types'

import rowShared from "../shared-dom/row.shared.vue";
import textShared from "../shared-dom/text.shared.vue";
import buttonShared from "../shared-dom/button.shared.vue";

import recordAlertField from "../shared-field/record-alert.field.vue";
import inputField from "../shared-field/input.field.vue";
import AccorditionField from "../shared-field/accordition.field.vue";
import checkboxField from "../shared-field/checkbox.field.vue";
import bulkField from "../shared-field/bulk.field.vue";

import taskForm from "./task-form.vue";
import useTask from "../../uses/useTask";


const keywords = ref<string>("");
const queueActions = ref<string[]>([]);
const trackingNumber = ref<number>(1101997);

const { state, completeTask, deleteTask, fetchTasks } = useTask();

const tasksFiltered = computed( () => {
    if(trackingNumber.value){
        return state.tasks.filter((item) => 
            !item.completed && item.title.toLowerCase().includes(keywords.value.toLowerCase())
        );
    } else {
        return [];
    }
});

async function onCompleteTasks() {
    await Promise.all(
        queueActions.value.map( async (id) => {
            await completeTask(id, true);
            queueActions.value = queueActions.value.filter(item => item !== id);
        })
    );
    await fetchTasks();
    trackingNumber.value = Math.floor(Math.random() * (1101998 - 11 + 1) + 11);
}

function onDeleteTask(id: string){
    const option = confirm("Are u sure?");
    if(option){
        deleteTask(id);
    }
}

async function onDeleteTasks() {
    const option = confirm("Are u sure?");
    if(option){
        await Promise.all(queueActions.value.map(async (id: string) => {
            await deleteTask(id);
            queueActions.value = queueActions.value.filter(item => item !== id);
        }))
        await fetchTasks();
    }
}

function onSelectedTask($event: Event, id: string){
    const value = ($event?.target as HTMLInputElement).checked;
    if( value && !queueActions.value.includes(id)){
        queueActions.value.push(id);
    } else if ( !value && queueActions.value.includes(id)) {
        const index = queueActions.value.indexOf(id);
        if( index > -1 ){
            queueActions.value.splice(index, 1);
        }
    }
}

</script>

<template>
    <rowShared>
        <textShared class="text-center" tag="h1">Todo List</textShared>
        <rowShared>
            <inputField
                id="keywordTask"
                name="keywordTask"  
                placeholder="Search..."
                type="text"
                v-model="keywords"
            />
        </rowShared>
        <recordAlertField v-if="tasksFiltered?.length === 0">
            <span>No Task yet...</span>
        </recordAlertField>
        <rowShared v-else>
            <AccorditionField id="tasks" :items="tasksFiltered" ref="hello">
                <template #header="{ item, events: {toggleTaskDetails}} : {item: AccordionItemsTypes, events: {toggleTaskDetails:any}}">
                    <div class="flex justify-between p-4">
                        <div class="flex items-center">
                            <checkboxField
                            :id="`accordion_${item._id}`"
                            :name="`accordion_${item._id}`"
                            :label="item.title"
                            :value="item.completed"
                            @change="onSelectedTask($event, item._id as string)"
                        />
                        </div>
                        <div class="ml-auto flex gap-4">
                            <buttonShared
                                class="ad-button-default"
                                type="button"
                                @click="toggleTaskDetails(item._id as string)"
                            >Detail
                            </buttonShared>
                            <buttonShared
                                class="ad-button-danger"
                                type="button"
                                @click="onDeleteTask(item._id as string)"
                            >Remove
                            </buttonShared>
                        </div>
                    </div>
                </template>
                <template #body="{item}">
                    <div class="p-4">
                        <taskForm :item="item" :is-has-title="false"/>
                    </div>
                </template>
            </AccorditionField>
        </rowShared>

        <bulkField
            v-show="queueActions.length > 0"
            :quantity="queueActions.length"
        >
            <template #actions>
                <buttonShared
                    class="ad-button-success"
                    type="button"
                    @click="onCompleteTasks"
                >Done
                </buttonShared>
                <buttonShared
                    class="ad-button-danger" 
                    type="button"
                    @click="onDeleteTasks"
                >Remove</buttonShared>
            </template>
        </bulkField>
    </rowShared>
</template>