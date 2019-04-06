<template>
    <v-app dark>
        <v-layout align-center justify-center row full-height>
            <v-flex xs10 lg4>
                <v-card>
                    <v-card-title>
                        <v-layout justify-center>
                            <span class="headline">Login</span>
                        </v-layout>
                    </v-card-title>
                    <v-container>
                        <v-form
                                ref="form"
                                lazy-validation
                        >
                            <v-layout justify-center>
                                <v-flex xs10 lg10>
                                    <v-text-field
                                            required
                                            v-model="email"
                                            label="Email"
                                            :rules="[rules.required, rules.email]"
                                    >
                                    </v-text-field>

                                    <v-text-field
                                            required
                                            v-model="password"
                                            label="Password"
                                            :type="showPassword ? 'text' : 'password'"
                                            :rules="[rules.required, rules.min]"
                                            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                                            @click:append="showPassword = !showPassword"
                                    >
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout justify-center>
                                <v-btn color="success" @click="validateAndSubmit">Login</v-btn>
                            </v-layout>
                        </v-form>
                        <v-layout align-center justify-center column fill-height pt-3>
                            <v-flex>
                                <router-link to="/register">
                                    <a>Register</a>
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
        name: 'login-page',
        data () {
            return {
                email: '',
                password: '',
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 8 || 'Min 8 characters',
                    email: s => s.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) != null || 'Enter a valid email',
                    emailMatch: () => ('The email and password you entered doesn\'t match')
                },
                showPassword: false
            }
        },
        methods: {
            validateAndSubmit(){
                if (this.$refs.form.validate()) {
                    this.snackbar = true
                    return;
                }



            }
        }
    }
</script>