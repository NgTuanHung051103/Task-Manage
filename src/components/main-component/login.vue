<script setup lang="ts">
import { ref, PropType} from "@vue/runtime-core"
import { User } from '../../types';
import rowShared from '../shared-dom/row.shared.vue';
import textShared from '../shared-dom/text.shared.vue';
import buttonShared from "../shared-dom/button.shared.vue";
import inputField from "../shared-field/input.field.vue";
import useUser from "../../uses/useUser";

const props = defineProps({
    user: {
        type: Object as PropType<User>,
        required: true
    }
})
let validUser = ref<boolean>(false)

const emits = defineEmits(['login'])

const { Login } = useUser();

async function onSubmit() {
    if(props.user.userName.trim() == '' || props.user.password.trim() == ''){
        return;
    }
    let userLogin : User = {
        userName: props.user.userName,
        password: props.user.password,
    }
    let isLogin = await Login(userLogin);
    
    if(isLogin != undefined){
        validUser.value = true;
    }
}
</script>

<template>
    <rowShared>
        <template v-if="validUser">
            <textShared  class="text-center" tag="h1">Hi {{ user.userName }}</textShared>
        </template>
        <template v-else="validUser" >
            <form @submit.prevent="onSubmit" class="grid grid-cols-1 gap-4">
            <textShared class="text-center" tag="h1">Login</textShared>
            <rowShared>
                <inputField
                    id="userName"
                    name="userName"
                    label="User name"
                    placeholder="Please input..."
                    type="text"
                    v-model="user.userName"
                />
                <inputField
                    id="password"
                    name="password"
                    label="Password"
                    placeholder="Please input..."
                    type="password"
                    v-model="user.password"
                />
                <buttonShared class="ad-button-primary" type="submit">
                    Login
                </buttonShared>
            </rowShared>
            </form>
        </template>
    </rowShared>
</template>