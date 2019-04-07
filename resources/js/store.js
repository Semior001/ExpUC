import Vuex from "vuex";
import * as Vue from "vue";
import * as axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('user-token') || '',
        status: '',
    },

    getters: {
        IS_AUTHENTICATED: state => !!state.token,
        AUTH_STATUS: state => state.status
    },

    mutations: {
        "AUTH_REQUEST": (state) => {
            state.status = 'loading'
        },
        "AUTH_SUCCESS": (state, token) => {
            state.status = 'success';
            state.token = token
        },
        "AUTH_ERROR": (state) => {
            state.status = 'error'
        },

    },

    actions: {
        "AUTH_REQUEST": ({commit, dispatch}, user) => {
            return new Promise((resolve, reject) => { // The Promise used for router redirect in login
                commit("AUTH_REQUEST");
                axios({url: 'auth', data: user, method: 'POST'})
                    .then(resp => {
                        const token = resp.data.token;
                        localStorage.setItem('user-token', token); // store the token in localstorage
                        commit("AUTH_SUCCESS", token);
                        // you have your token, now log in your user :)
                        dispatch("USER_REQUEST");
                        resolve(resp)
                    })
                    .catch(err => {
                        commit("AUTH_ERROR", err);
                        localStorage.removeItem('user-token'); // if the request fails, remove any possible user token if possible
                        reject(err)
                    })
            })
        }
    },
});
