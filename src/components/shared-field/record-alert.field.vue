<script lang="ts" setup>
import rowShared from '../shared-dom/row.shared.vue'

defineProps({
    text: {
        type: String,
        required: false
    }
})
</script>

<template>
<rowShared>
    <slot></slot>
</rowShared>
</template>