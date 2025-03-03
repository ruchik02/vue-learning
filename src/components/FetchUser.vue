<script>
import axios from "axios";
export default {
    data() {
        return {
            name: "",
            email: "",
            users: [],
            snackbar: false, // Snackbar visibility
            successMessage: "", // Message for Snackbar
            isValid: false, // Form validation status
            isEditing: false, // Track if editing
            editUserId: null, // Store user ID for editing
            loading: false,
            snackbarColor: "success",
            originalName: "",  // Store original name before editing
            originalEmail: "", // Store original email before editing
            rules: {
                required: (value) => !!value || "Field is required", // Required validation
                email: (value) =>
                    /.+@.+\..+/.test(value) || "E-mail must be valid", // Email validation
            },
        };
    },
    methods: {
        async submitForm() {
            const form = this.$refs.form;
            if (!form.validate()) return; // Stop if form is invalid

            if (this.isEditing) {
                this.updateUser();
            } else {
                this.addUser();
            }
        },
        async addUser() {
            this.loading = true; //Show loader
            try {
                await axios.post(
                    "http://127.0.0.1:5001/intelligent-photo-galler-44031/us-central1/addUser",
                    {
                        name: this.name,
                        email: this.email,
                    }
                );
                this.name = "";
                this.email = "";
                // show message
                this.successMessage = "User added successfully!";
                this.snackbarColor = "success"; 
                this.snackbar = true;
                // refresh the user list
                this.fetchUsers();
            } catch (error) {
                console.error(error);
            } finally {
                this.loading = false; // Hide loader
                this.clearFields();
            }
        },
        async updateUser() {
            this.loading = true // show loaders
            try {
                await axios.put(`http://127.0.0.1:5001/intelligent-photo-galler-44031/us-central1/updateUsers?id=${this.editUserId}`, {
                    name: this.name, email: this.email
                })
                this.successMessage = "User updated successfully!";
                this.snackbarColor = "success"; 
                this.snackbar = true;
                this.isEditing = false;
                this.clearFields();
                this.fetchUsers();
            } catch (error) {
                console.error(error);
            } finally {
                this.loading = false; // Hide loader
                this.clearFields();
            }
        },
        async deleteUser(userId) {
            try {
                await axios.delete(`http://127.0.0.1:5001/intelligent-photo-galler-44031/us-central1/deleteUser?id=${userId}`)
                this.successMessage = "User deleted successfully!";
                this.snackbarColor = "error"; 
                this.snackbar = true;
                this.fetchUsers(); // Refresh the user list after deletion
            } catch (error) {
                console.error(error);
            }
        },
        editUser(user) {
            this.name = user.name;
            this.email = user.email;
            this.originalName = user.name;  // Save original name
            this.originalEmail = user.email; // Save original email
            this.isEditing = true;
            this.editUserId = user.id;
        },
        cancelEdit() {
            this.isEditing = false;
            this.clearFields();
        },
        clearFields() {
            // Clear Input Fields after success message disappears
            this.name = "";
            this.email = "";
            this.$refs.form.resetValidation(); // Reset validation
        },
        async fetchUsers() {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:5001/intelligent-photo-galler-44031/us-central1/getUsers"
                );
                this.users = response.data;
            } catch (error) {
                console.error(error);
            }
        },

    },
    mounted() {
        this.fetchUsers();
    }
};
</script>
<template>
    <v-app>
        <v-container>
            <v-form ref="form" v-model="isValid">
                <v-text-field v-model="name" label="Name" :rules="[rules.required]" required></v-text-field>
                <v-text-field v-model="email" label="Email" :rules="[rules.required, rules.email]"
                    required></v-text-field>
                <v-row>
                    <v-col>
                        <v-btn v-if="!isEditing" color="primary" @click="submitForm"
                            :disabled="!name || !email || loading">
                            <v-progress-circular v-if="loading" indeterminate color="white"
                                size="20"></v-progress-circular>
                            <span v-else>Add User</span>
                        </v-btn>
                        <v-btn v-if="isEditing" color="blue" @click="updateUser"
                            :disabled="(name === originalName && email === originalEmail) || loading">
                            <v-progress-circular v-if="loading" indeterminate color="white"
                                size="20"></v-progress-circular>
                            <span v-else>Update User</span>
                        </v-btn>
                        <v-btn v-if="isEditing" color="red" class="ml-3" @click="cancelEdit">Cancel</v-btn>
                    </v-col>
                    <v-col class="text-right">
                        <v-btn color="success" @click="fetchUsers">Fetch Users</v-btn>
                    </v-col>
                </v-row>
            </v-form>
            <!-- snackbar show message(success) -->
            <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="2000" @update:model-value="clearFields">
                {{ successMessage }}
            </v-snackbar>
            <v-row v-if="users.length" class="mt-3">
                <v-col v-for="user in users" :key="user.id" cols="12" md="6" lg="4">
                    <v-card class="pa-3">
                        <v-card-title class="text-h6">{{ user.name }}</v-card-title>
                        <v-card-subtitle>{{ user.email }}</v-card-subtitle>
                        <v-card-actions>
                            <v-btn icon color="blue" @click="editUser(user)">
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn icon color="red" @click="deleteUser(user.id)">
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>
