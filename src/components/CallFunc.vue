<script>
import { ref } from 'vue';
import {functions, httpsCallable} from '@/firebaseConfig'
const message = ref("");
const callFunction = async () => {
  const helloWorld = httpsCallable(functions, "helloWorld");
  const response = await helloWorld({name: "Ruchika"});
  message.value = response.data.message;
};
</script>
<template>
<v-btn @click="callFunction">Call Firebase Function</v-btn>
<p>{{ message }}</p>
</template>