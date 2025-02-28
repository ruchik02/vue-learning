<script>
import { mapActions, mapState } from 'vuex';
export default {
    data() {
        return {
            selectedFile: null, // stores file for upload
            newFile: null , // stores new file for update
            fileInputKey: 0, // key to force re-render
            newFileInputKey: 0 // key to force re-render
        };
    },
    computed: {
        ...mapState(["imageUrl", "imagePath"])
    },
    methods: {
        ...mapActions(["uploadImage", "fetchImage", "updateImage", "deleteImage"]),
        handleFileUpload(event) {
            this.selectedFile = event.target.files[0];
        },
        async uploadImageToFirebase() {
            if (!this.selectedFile) return;
            try {
                await this.uploadImage(this.selectedFile);
                this.selectedFile = null;
                this.fileInputKey++;
            } catch (error) {
                console.error("Upload failed:", error);
            }
        },
        handleFileUpdate(event) {
            this.newFile = event.target.files[0];
        },
        async updateImageFromFirebase() {
            if (!this.newFile) return;
            try {
                await this.updateImage(this.newFile);
                this.newFile = null;
                this.newFileInputKey++; 
            } catch (error) {
                console.error("Update failed:", error);
            }
        },
        async deleteImageFromFirebase() {
            if (!this.imagePath) return;
            try {
                await this.deleteImage(this.imagePath);
            } catch (error) {
                console.error("Delete failed:", error);
            }
        }
    }
}
</script>
<template>
    <v-container>
        <v-card class="pa-5">
            <v-card-title class="text-h5">Firebase Storage</v-card-title>
            <!-- upload image -->
            <v-file-input  :key="fileInputKey" label="Choose Image" accept="image/*" @change="handleFileUpload" outlined>
            </v-file-input>
            <v-btn class="ml-10" @click="uploadImageToFirebase" color="primary" :disabled="!selectedFile">
                Upload Image
            </v-btn>
            <!-- display uploaded image -->
            <v-card v-if="imageUrl" class="mt-5 pa-3">
                <v-img :src="imageUrl"></v-img>
                <v-btn  @click="deleteImageFromFirebase" class="mt-3 ml-10" color="error">Delete Image</v-btn>
            </v-card>
           
            <!-- update image -->
            <v-file-input :key="newFileInputKey" label="Choose New Image" class="mt-5" @change="handleFileUpdate" accept="image/*" outlined>
            </v-file-input>
            <v-btn class="ml-10" @click="updateImageFromFirebase" color="success" :disabled="!newFile">
                Update Image
            </v-btn>
        </v-card>
    </v-container>
</template>
<style scoped>
.v-container {
    max-width: 500px;
    margin: auto;
}
</style>