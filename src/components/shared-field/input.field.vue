<script setup lang="ts">
import { PropType, ref } from "@vue/runtime-core";
import inputShared from '../shared-dom/input.shared.vue';
import textShared from '../shared-dom/text.shared.vue';

type InputTypes = 
    | "date"
    | "text"
    | "email"
    | "password"
    | "checkbox"
    | "radio"
    | undefined;

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
        default: null,
    },
    placeholder: {
        type: String,
        required: true,
        default: null,
    },
    type: {
        type: String as PropType<InputTypes>,
        required: false,
        default: "text",
        validator: (value: string) => {
            const _inputTypes = ["date", "text", "email", "password"];
            return _inputTypes.includes(value);
        }
    },
    modelValue: {
        type: [Number, String],
        required: false,
    }
})
</script>

<template>
    <div class="ml-input-field">
        <textShared
            v-if="label" 
            tag="label"
            :for="id"
            class="ml-label"
        >
        {{ label }}
        </textShared>

        <inputShared
            :id="id"
            :name="name"
            :placeholder="placeholder"
            :type="type"
            :model-value="modelValue"
            @input="$emit('update:modelValue', 
                type === 'date' && typeof ($event?.target as HTMLInputElement).value === 'string' 
                    ? (new Date(($event?.target as HTMLInputElement).value)).getTime() 
                    : ($event?.target as HTMLInputElement).value)"
        ></inputShared>
    </div>
</template>