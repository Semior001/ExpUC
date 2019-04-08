import Vuex from "vuex";
import * as Vue from "vue";
import * as axios from "axios";

Vue.use(Vuex);

// dispatch - запустить  action
// commit - запустить mutation

export const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('user-token') || '',
        status: ''
    },

    getters: {
        isAuthenticated: state => !!state.token,
        authStatus: state => state.status,
    },

    mutations: {
        "AUTH_REQUEST": (state) => {
            state.status = 'loading';
        },
        "AUTH_SUCCESS": (state, token) => {
            state.status = 'success';
            state.token = token;
        },
        "AUTH_ERROR": (state) => {
            state.status = 'error';
        },
    },

    actions: {
        "AUTH_REQUEST": ({commit, dispatch}, user) => {
            return new Promise((resolve, reject) => { // The Promise used for router redirect in login
                commit("AUTH_REQUEST");
                axios({url: 'api/login', data: user, method: 'POST'})
                    .then(response => {
                        const token = response.data.api_token;
                        localStorage.setItem('user-token', token);
                        axios.defaults.headers.common['Authorization'] = token;
                        commit("AUTH_SUCCESS", token);
                        resolve(response)
                    })
                    .catch(error => {
                        commit("AUTH_ERROR", error);
                        localStorage.removeItem('user-token'); // if the request fails, remove any possible user token if possible
                        reject(error)
                    })
            });
        },
        "AUTH_LOGOUT": ({commit, dispatch}) => {
            return new Promise((resolve, reject) => {
                commit("AUTH_LOGOUT");
                localStorage.removeItem('user-token');
                delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        },
        "REGISTER_REQUEST": ({commit, dispatch}, user) => {
            return new Promise((resolve, reject) => {
                axios({url: 'api/register', data:user, method: 'POST'})
                    .then(response => {
                        const token = response.data.api_token;
                        localStorage.setItem('user-token', token);
                        axios.defaults.headers.common['Authorization'] = token;
                        commit("AUTH_SUCCESS", token);
                        resolve(response);
                    })
            });
        }
    },
});
