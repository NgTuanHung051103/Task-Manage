<script setup lang="ts">
import { PropType } from 'vue';
import { Message } from '../../types';
import useUser from '../../uses/useUser';
import inputShared from '../shared-dom/input.shared.vue';
import buttonShared from '../shared-dom/button.shared.vue';
import textShared from '../shared-dom/text.shared.vue';

defineProps({
    items: { 
        type: Object as PropType<Message[]>,
        required: true
    }
})

const { state } = useUser();

</script>

<template>
    <div class="chat-container"> 
        <div>
            <textShared tag="h2">Group chat</textShared>
        </div>
        <div class="message-container"> 
            <div v-for="item in items" 
                class="message" :class="`${item.userId == state.user.id ? `receiver-message`: `sender-message`}`"
            > 
                <span>{{ item.userId }}: </span>
                <span>{{ item.content }}</span> 
            </div>
        </div> 
        <div class="message"> 
            <inputShared
                id=""
                name=""
                placeholder="Type your message..."
                type="text"
            />
            <buttonShared type="submit">Send</buttonShared>
        </div> 
    </div> 
</template>