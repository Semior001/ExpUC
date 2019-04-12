<template>
    <v-app dark>

        <Navigation v-if="showNavigation"/>

        <router-view />

    </v-app>
</template>

<script>
    import * as axios from 'axios';
    import Navigation from './Navigation';

    export default {
        name: 'main-app',
        components: {
            Navigation
        },
        data: function() {
            return {
                showNavigation: true
            }
        },
        created: function () {
            this.$router.options.routes.forEach(route => {
                if(this.$route.name === route.name && !!route.doNotShowNavigation){
                    this.showNavigation = false;
                }
            });

            let store = this.$store;
            let router = this.$router;

            axios.interceptors.response.use(undefined, err => {
                if (err.response.status === 401 && err.response.config && !err.response.config.__isRetryRequest) {
                    return new Promise((resolve, reject) => {
                        document.location.reload();
                        store.dispatch('user/AUTH_LOGOUT');
                    });
                }
                return err;
            });
        }
    }
</script>

<style>
    button:focus {
        outline: 0 !important;
    }
</style>
