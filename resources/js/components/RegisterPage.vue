<template>
    <v-app dark>
        <v-layout align-center justify-center row full-height>
            <v-flex xs10 lg4>
                <v-card>
                    <v-card-title>
                        <v-layout justify-center>
                            <span class="headline">Registration</span>
                        </v-layout>
                    </v-card-title>
                    <v-container>
                        <v-form
                                ref="form"
                                lazy-validation
                                @submit.prevent="validateAndSubmit"
                        >
                            <v-alert
                                    :value="showAlert"
                                    type="error"
                            >
                                {{ alertMessage }}
                            </v-alert>
                            <v-layout justify-center>
                                <v-flex xs10 lg10>
                                    <v-text-field
                                            v-model="name"
                                            label="Name"
                                            :rules="[rules.required]"
                                    >
                                    </v-text-field>

                                    <v-text-field
                                            v-model="email"
                                            label="Email"
                                            :rules="[rules.required, rules.email]"
                                    >
                                    </v-text-field>

                                    <v-text-field
                                            v-model="password"
                                            label="Password"
                                            :type="'password'"
                                            :rules="[rules.required, rules.min]"
                                    >
                                    </v-text-field>

                                    <v-text-field
                                            v-model="passwordConfirmation"
                                            label="Password confirmation"
                                            :type="'password'"
                                            :rules="[rules.required, rules.min]"
                                    >
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout justify-center>
                                <v-btn type="submit" color="success">Register</v-btn>
                            </v-layout>
                        </v-form>
                        <v-layout align-center justify-center column fill-height pt-3>
                            <v-flex>
                                <router-link to="/login">
                                    <a>Login</a>
                                </router-link>
                            </v-flex>
                            <v-flex pt-3>
                                <router-link to="/reset-password">
                                    <a>Forgot password?</a>
                                </router-link>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-app>
</template>

<script>
    export default {
        name: 'register-page',
        data ()  {
            return {
                email: '',
                name: '',
                password: '',
                passwordConfirmation: '',
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 8 || 'Min 8 characters',
                    email: s => s.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) != null || 'Enter a valid email'
                },
                showAlert: false,
                alertMessage: ""
            }
        },
        methods: {
            validateAndSubmit(){
                this.showAlert = false;
                // если какое-то поле введено не правильно
                if (!this.$refs.form.validate()) {
                    return;
                }

                let name = this.name;
                let email = this.email;
                let password = this.password;
                let password_confirmation = this.passwordConfirmation;

                this.$store.dispatch("REGISTER_REQUEST", { name, email, password, password_confirmation }).then(() => {
                    this.$router.push('/')
                }).catch(err => {
                    this.alertMessage = err.toString() + " Please, contact with administrator.";
                    this.showAlert = true;
                });
            }
        }
    }
</script>