import { createStore } from "vuex";
import {
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "@/firebaseConfig";
const store = createStore({
  state: {
    imageUrl: null,
    imagePath: null, // for uploaded image path
  },
  mutations: {
    setImage(state, payload) {
      state.imageUrl = payload.url;
      state.imagePath = payload.path;
    },
    clearImage(state) {
      state.imageUrl = null;
      state.imagePath = null;
    },
  },
  actions: {
    // upload image to firebase storage
    async uploadImage({ commit }, file) {
      try {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadUrl = await getDownloadURL(storageRef);
        commit("setImage", { url: downloadUrl, path: `images/${file.name}` });
        return downloadUrl;
      } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
      }
    },
    // fetch firebase image from firebase storage
    async fetchImage({ commit }, imagePath) {
      try {
        const storageRef = ref(storage, imagePath);
        const url = await getDownloadURL(storageRef);
        commit("setImage", { url, path: imagePath });
      } catch (error) {
        console.error("Error fetching image:", error);
        throw error;
      }
    },
    // update Image
    async updateImage({ state, dispatch }, newFile) {
      try {
        if (state.imagePath) await dispatch("deleteImage", state.imagePath);
        return await dispatch("uploadImage", newFile);
      } catch (error) {
        console.error("Error updating image:", error);
        throw error;
      }
    },
    // delete image from firebase storage
    async deleteImage({ commit }, imagePath) {
      try {
        const storageRef = ref(storage, imagePath);
        await deleteObject(storageRef);
        commit("clearImage");
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    },
  },
});
export default store;
