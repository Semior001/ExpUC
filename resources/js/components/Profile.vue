<template>
    <div>
        <Navigation />

        <v-layout align-center justify-center row full-height>
            <v-flex xs10 lg8 pt-5>
                <v-card>
                    <v-card-title>
                        <v-layout justify-center>
                            <span class="headline">Profile</span>
                        </v-layout>
                    </v-card-title>
                    <v-container>
                        <v-form
                                ref="form"
                                lazy-validation
                        >
                            <v-layout justify-center>
                                <v-flex xs10 lg10>
                                    <v-alert
                                            :value="!!alertMessage"
                                            :type="alertMessageType">
                                        {{ alertMessage }}
                                    </v-alert>
                                    <v-text-field
                                            required
                                            name="name"
                                            v-model="name"
                                            label="Name"
                                            :rules="[rules.required]">
                                    </v-text-field>
                                    <v-text-field
                                            required
                                            name="surname"
                                            v-model="surname"
                                            label="Surname">
                                    </v-text-field>
                                    <v-text-field
                                            required
                                            name="email"
                                            v-model="email"
                                            label="Email"
                                            :rules="[rules.required, rules.email]">
                                    </v-text-field>

                                    <!-- todo avatar upload btn -->
                                    <div id="previewAvatarContainer" class="justify-center">
                                        <img v-if="previewAvatarUrl" :src="previewAvatarUrl" alt="whoops">
                                        <input @change="previewAvatar" ref="uploadAvatarInput" type="file" hidden accept="image/*">
                                        <v-btn class="ml-5" @click="startFileDialog" color="primary">Upload avatar</v-btn>
                                    </div>
                                    <!-- /todo avatar upload btn -->

                                    <v-divider></v-divider>

                                    <v-layout justify-center>
                                        <v-subheader class="green--text">
                                            Please, provide your telegram nickname for better communication
                                        </v-subheader>
                                    </v-layout>
                                    <v-text-field
                                            autocomplete="username"
                                            lg8
                                            required
                                            name="telegram"
                                            v-model="telegram"
                                            label="Telegram Nickname">
                                    </v-text-field>

                                    <v-divider></v-divider>

                                    <v-text-field
                                            autocomplete="new-password"
                                            name="password"
                                            v-model="password"
                                            label="Password"
                                            :type="'password'"
                                    >
                                    </v-text-field>

                                    <v-text-field
                                            autocomplete="new-password"
                                            name="password_confirmation"
                                            v-model="passwordConfirmation"
                                            label="Password confirmation"
                                            :type="'password'"
                                    >
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout justify-center>
                                <v-btn type="submit" color="success">Save</v-btn>
                            </v-layout>
                        </v-form>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>

    </div>
</template>

<script>
    import Navigation from './Navigation';
    import * as axios from "axios";

    export default {
        components: {
            Navigation,
        },
        data: function(){
            return {
                alertMessage: '',
                alertMessageType: 'error',
                email: '',
                name: '',
                surname: '',
                telegram: '',
                password: '',
                passwordConfirmation: '',
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 8 || 'Min 8 characters',
                    email: s => s.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) != null || 'Enter a valid email'
                },
                previewAvatarUrl: null,
            };
        },
        methods: {
            startFileDialog: function(){
                this.$refs.uploadAvatarInput.click();
            },
            previewAvatar: function(){
                const file = this.$refs.uploadAvatarInput.files[0];
                this.previewAvatarUrl = URL.createObjectURL(file);
            }
        },
        created() {
            this.$store.dispatch('user/LOAD_USER_DATA')
                .then((response) => {
                    this.name = this.$store.getters['user/name'];
                    this.surname = this.$store.getters['user/surname'];
                    this.telegram = this.$store.getters['user/telegram'];
                    this.email = this.$store.getters['user/email'];
                    this.previewAvatarUrl = this.$store.getters['user/avatar'];
                }).catch((error) => {
                    this.alertMessage = error.response.data;
                });
        }
    }
</script>

<style>
    #previewAvatarContainer {
        display: flex;
    }

    #previewAvatarContainer img {
        max-width: 100%;
        max-height: 100px;
    }
</style>