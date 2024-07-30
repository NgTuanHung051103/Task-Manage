<script setup lang="ts">
import rowShared from '../shared-dom/row.shared.vue';
import useMessage from '../../uses/useMessage';
import { PropType } from 'vue';
import { Message } from '../../types';
import messageGroupField from './message-group.field.vue';

const props = defineProps({
    taskId: { 
        type: String,
        required: true
    }
})

const { getMessages, state } = useMessage();

</script>

<template>
    <rowShared>
        <messageGroupField :items="state.messages">
        </messageGroupField>
    </rowShared>
</template>