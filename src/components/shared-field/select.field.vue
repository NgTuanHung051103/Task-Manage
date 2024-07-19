<script setup lang="ts">
import { PropType } from "vue";

import textShared from '../shared-dom/text.shared.vue';
import selectShared from '../shared-dom/select.shared.vue';

export type SelectOptionsTypes = {
    label: string;
    value: string;
}

defineProps({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    options: {
        type: Array as PropType<SelectOptionsTypes[]>,
        require: true,
        default: () => [],
    },
    modelValue: {
        type: [Number, String],
        required: false,
    }
})
</script>

<template>
    <div class = "m-textarea-field">
        <textShared tag="label" :for="id" class="ml-label">{{ label }}</textShared>
        <selectShared
            :id="id"
            :name="name"
            :options="options"
            :model-value="modelValue"
            @input="$emit('update:modelValue', ($event?.target as HTMLInputElement).value)"
        ></selectShared>
    </div>
</template>