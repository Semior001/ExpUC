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
