<template>
    <div>
        <Navigation />

        <v-content>
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
                                    @submit.prevent="onSubmit"
                            >
                                <v-layout justify-center>
                                    <v-flex xs10 lg10>
                                        <v-alert
                                                class="mb-5"
                                                :value="!!alertMessage"
                                                :type="alertMessageType">
                                            {{ alertMessage }}
                                        </v-alert>
                                        <v-text-field
                                                v-model="email"
                                                label="Email (cannot be edited)"
                                                disabled>
                                        </v-text-field>
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

                                        <v-divider></v-divider>

                                        <div class="row">
                                            <div id="previewAvatarContainer" class="col-lg-6">
                                                <img v-if="previewAvatarUrl" :src="previewAvatarUrl" alt="whoops">
                                                <input name="avatar" @change="previewAvatar" ref="uploadAvatarInput" type="file" hidden accept="image/*">
                                                <v-btn class="ml-3" @click="startFileDialog" color="primary">Upload avatar</v-btn>
                                            </div>
                                            <div class="col-lg-6">
                                                <v-checkbox
                                                        v-model="showSchedule"
                                                        :label="`Show my schedule to others`"
                                                ></v-checkbox>
                                            </div>
                                        </div>

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
                                                name="current_password"
                                                v-model="currentPassword"
                                                label="Current password"
                                                :type="'password'"
                                        >
                                        </v-text-field>

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
        </v-content>
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
                currentPassword: '',
                showSchedule: false,
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
            },
            onSubmit: function(){

                this.alertMessageType = 'warning';
                this.alertMessage = 'Processing... Please wait...';

                const data = new FormData;
                data.append('name', this.name);
                data.append('surname', !!this.surname ? this.surname : '');
                data.append('telegram', !!this.telegram ? this.telegram : '');
                data.append('current_password', this.currentPassword);
                data.append('password', this.password);
                data.append('password_confirmation', this.passwordConfirmation);
                data.append('show_schedule', this.showSchedule ? '1' : '0');

                if(this.$refs.uploadAvatarInput.files.length)
                    data.append('avatar', this.$refs.uploadAvatarInput.files[0]);

                axios({
                    url: '/api/user/update',
                    method: 'POST',
                    data: data
                }).then(response => {
                    if(response.status === 200){
                        this.alertMessageType = 'success';
                        this.alertMessage = 'Success! Your profile data has been updated!';
                        return;
                    }
                    this.alertMessageType = 'error';
                    this.alertMessage = response.response.data;
                }).catch(error => {
                    this.alertMessageType = 'error';
                    this.alertMessage = error.response.data;
                });
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
                    this.showSchedule = this.$store.getters['user/showSchedule'];
                }).catch((error) => {
                    this.alertMessage = error;
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