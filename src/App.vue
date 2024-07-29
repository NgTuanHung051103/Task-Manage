<script setup lang="ts">
import { ref } from "@vue/reactivity";
import type { AccordionItemsTypes, User } from "./types";
import taskForm from "./components/main-component/task-form.vue";
import tasksForm from "./components/main-component/tasks-form.vue";
import rowShared from "./components/shared-dom/row.shared.vue";
import flashNotificationField from "./components/shared-field/flash-notification.field.vue";
import login from "./components/main-component/login.vue";

const defaultTask = ref<AccordionItemsTypes>({
    title: "",
    description: "",
    dueDate: new Date().getTime(),
    priority: "normal",
    completed: false,
});

const user = ref<User>({
    userName: '',
    password: ''
})

</script>
            
<template>
    <rowShared cols="3" sm-cols="1" class="layout container">
        <login :user="user"/>
        <taskForm
            :item="defaultTask"
            @reset="
                defaultTask = {
                    title: '',
                    description: '',
                    dueDate: new Date().getTime(),
                    priority: 'normal',
                    completed: false,
                }
            "
        />
        <tasksForm/>
    </rowShared>
    <flashNotificationField message="hello ca nha"/>
</template>
<style scoped>
</style>