<script setup lang="ts">
import inputShared from '../shared-dom/input.shared.vue';
import textShared from '../shared-dom/text.shared.vue';

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
    value: {
        type: [Number, String, Boolean],
        required: false
    }
});
</script>

<template>
    <div class="ml-checkbox-field">
        <inputShared
            :id="id"
            :name="name"
            type="checkbox"
            :model-value="value"
            @input="$emit('change:value', ($event?.target as HTMLInputElement).value)"
        ></inputShared>
        <textShared tag="label" :for="id" class="ml-label ml-label-checkbox">{{ label }}</textShared>
    </div>
</template>