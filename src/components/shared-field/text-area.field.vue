<script setup lang="ts">
import textShared from '../shared-dom/text.shared.vue';
import textareaShared from '../shared-dom/textarea.shared.vue';

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
    placeholder: {
        type: String,
        required: false,
        default: null,
    },
    modelValue: {
        type: [Number, String],
        required: false,
    },
});
</script>

<template>
    <div class="m-textarea-field">
        <textShared tag="label" :for="id" class="ml-label">{{ label }}</textShared>
        <textareaShared
            :id="id"
            :name="name"
            :placeholder="placeholder"
            :value="modelValue"
            @input="$emit('update:modelValue', ($event?.target as HTMLInputElement).value)"
            type="text"
        ></textareaShared>
    </div>
</template>
