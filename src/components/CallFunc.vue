<script>
import axios from "axios";
export default {
  data() {
    return {
      message: null
    };
  },
  methods: {
    async fetchMessage() {
      try {
        const response = await axios.get("http://127.0.0.1:5001/intelligent-photo-galler-44031/us-central1/helloWorld");
        this.message = response.data.message;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  }
};
</script>
<template>
<v-app>
    <v-container>
      <v-card class="pa-5">
        <v-btn color="primary" @click="fetchMessage">Call Cloud Function</v-btn>
        <v-alert v-if="message" type="success" class="mt-3">
          {{ message }}
        </v-alert>
      </v-card>
    </v-container>
  </v-app>
</template>