<script setup lang="ts">
import textShared from '../shared-dom/text.shared.vue';
import rowShared from '../shared-dom/row.shared.vue';

defineProps({
    quantity: {
        type: Number,
        default: 0,
    }
})

</script>

<template>
    <rowShared class="fixed bottom-0 left-0 w-full p-4 bg-white border border-t border-gray-300">
        <div class="flex items-center justify-between">
            <textShared tag="span">
                {{ quantity }} {{ quantity > 1 ? 'items' : 'item' }} selected
            </textShared>
            <div class="flex items-center justify-end gap-4">
                <slot name="actions"></slot>
            </div>
        </div>
    </rowShared>
</template>