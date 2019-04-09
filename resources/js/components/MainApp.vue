<template>
    <v-app dark>
        <router-view />
    </v-app>
</template>

<script>
    import * as axios from 'axios';

    export default {
        name: 'main-app',
        created: function () {
            var store = this.$store;
            var router = this.$router;

            axios.interceptors.response.use(undefined, err => {
                if (err.response.status === 401 && err.response.config && !err.response.config.__isRetryRequest) {
                    return new Promise((resolve, reject) => {
                        router.go('/login');
                        store.dispatch("AUTH_LOGOUT");
                    });
                }
                return err;
            });
        }
    }
</script>
