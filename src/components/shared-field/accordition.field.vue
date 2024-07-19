<script setup lang="ts">
import { PropType, ref } from '@vue/runtime-core';

defineProps({
    id: {
        type: String,
        required: true
    },
    items: {
        type: Array as PropType<any>,
        required: true
    }
})

const activeId = ref<string | null>(null)

function toggleTaskDetails(id: string) {
    activeId.value = activeId.value === id ? null : id;
}
</script>

<template>
    <div class="ml-accordion-field" v-for="item in items" :key="item.id">
        <div class="ml-accordion-field__nav">
            <slot name="header" :item="item" :events="{ toggleTaskDetails }"></slot>
        </div>
        <div class="ml-accordion-field__body" v-show="item.id === activeId">
            <slot name="body" :item="item" ></slot>
        </div>
    </div>
</template>