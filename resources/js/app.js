require('./bootstrap');
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import MainApp from './components/MainApp.vue';
import {routes} from './routes.js';
import {store} from './store.js';

Vue.use(VueRouter);
Vue.use(Vuex);

Vue.use(Vuetify, {
    theme: {
        background: '#212121',
        primary: '#FF9800',
        secondary: '#b0bec5',
        accent: '#FFCC80',
        error: '#b71c1c'
    }
});

const router = new VueRouter({
    routes,
    mode: 'history'
});

const app = new Vue({
    el: '#app',
    router,
    store,
    components: {
        MainApp
    }
});
