<script setup lang="ts">
import { ref, PropType, watch } from "@vue/runtime-core";

import type { AccordionItemsTypes } from '../../types' 

import rowShared from "../shared-dom/row.shared.vue";
import textShared from "../shared-dom/text.shared.vue";
import buttonShared from "../shared-dom/button.shared.vue";
import inputField from "../shared-field/input.field.vue";
import textAreaField from "../shared-field/text-area.field.vue";
import selectField from "../shared-field/select.field.vue";
import recordAlertField from "../shared-field/record-alert.field.vue";

import { SelectOptionsTypes } from "../shared-field/select.field.vue";
import useTask from "../../uses/useTask";

const priorityOptions = ref<SelectOptionsTypes[]>([
    {
        label: "Low",
        value: "low",
    },
    {
        label: "Normal",
        value: "normal",
    },
    {
        label: "High",
        value: "high",
    },
]);

const props = defineProps({
    item: {
        type: Object as PropType<AccordionItemsTypes>,
        required: true
    },
    isHasTitle: {
        type: Boolean,
        required: false,
        default: true
    }
})

const emits = defineEmits(['reset'])

const { createNewTask, updateTask, state, fetchTasks } = useTask();

async function onSubmit() {
    if(props.item.id){
        await updateTask(props.item.id, props.item)
    } else {
        let isCreated = await createNewTask(props.item)
        if( isCreated ){
            await fetchTasks();
        }
        emits('reset')
    }
}
</script>

<template>
    <rowShared>
        <textShared v-if="isHasTitle" class="text-center" tag="h1">New Task</textShared>
        <form v-if="item" @submit.prevent="onSubmit" class="grid grid-cols-1 gap-4">
            <rowShared>
                <inputField
                    id="titleTask"
                    name="titleTask"
                    placeholder="Add new task..."
                    type="text"
                    v-model="item.title"
                >
                </inputField>
            </rowShared>
            <rowShared>
                <textAreaField id="descTask" name="descTask" label="Description" v-model="item.description"/>
            </rowShared>
            <rowShared cols="2">
                <inputField
                    id="dueDateTask"
                    name="dueDateTask"
                    label="Due Date"
                    placeholder="Add new task..."
                    type="date"
                    v-model="item.dueDate"
                />
                <selectField
                    id="priorityTask"
                    name="priorityTask"
                    label="Priority"
                    :options="priorityOptions"
                    v-model="item.priority"
                />
            </rowShared>
            <rowShared>
                <buttonShared class="ad-button-primary" type="submit">
                    {{ item.id ? 'Update' : 'Add'}}
                </buttonShared>
            </rowShared>
            <rowShared>
                <recordAlertField>
                    <span class="text-danger">{{ state.error }}</span>
                </recordAlertField>
            </rowShared>
        </form>
    </rowShared>
</template>