import * as axios from "axios";

const state = {
    token: localStorage.getItem('api-token') || '',
    email: '',
    name: '',
    surname: '',
    telegram: '',
    avatar: '',
    showSchedule: false
};

const getters = {
    email: state => state.email,
    name: state => state.name,
    surname: state => state.surname,
    telegram: state => state.telegram,
    token: state => state.token,
    avatar: state => state.avatar,
    showSchedule: state => state.showSchedule,
    isAuthenticated: state => !!state.token
};

const mutations = {
    "AUTH_SUCCESS": (state, token) => {
        state.status = 'success';
        state.token = token;
        localStorage.setItem('api-token', token);
        axios.defaults.headers.common['Authorization'] = "Bearer " + token;
    },
    "AUTH_ERROR": (state, response) => {
        state.status = response;
        localStorage.removeItem('api-token');
        state.email = '';
        state.name = '';
        state.surname = '';
        state.telegram = '';
        state.avatar = '';
    },
    "AUTH_REQUEST": (state) => {
        state.status = 'loading';
    },
    "AUTH_LOGOUT": (state) => {
        state.status = '';
        localStorage.removeItem('api-token');
        delete axios.defaults.headers.common['Authorization'];
    },
    "PUT_USER_DATA": (state, userData) => {
        state.email = userData.email;
        state.name = userData.name;
        state.surname = userData.surname;
        state.telegram = userData.telegram;
        state.avatar = userData.avatar;
        state.showSchedule = userData.showSchedule;
    },
};

const actions = {
    "AUTH_REQUEST": ({commit, dispatch}, user) => {
        return new Promise((resolve, reject) => { // The Promise used for router redirect in login
            commit("AUTH_REQUEST");
            axios({url: '/api/login', data: user, method: 'POST'})
                .then(response => {
                    if(response.status === 200) {
                        const token = response.data.api_token;
                        commit("AUTH_SUCCESS", token);
                        dispatch("LOAD_USER_DATA");
                        resolve(response);
                        return;
                    }
                    commit("AUTH_ERROR", response);
                    reject(response);
                })
                .catch(error => {
                    commit("AUTH_ERROR", error);
                    reject(error)
                })
        });
    },
    "AUTH_LOGOUT": ({commit, dispatch}) => {
        return new Promise((resolve, reject) => {
            commit("AUTH_LOGOUT");
            resolve()
        })
    },
    "REGISTER_REQUEST": ({commit, dispatch}, user) => {
        return new Promise((resolve, reject) => {
            commit("AUTH_REQUEST");
            axios({url: '/api/register', data:user, method: 'POST'})
                .then(response => {
                    if(response.status === 200){
                        const token = response.data.api_token;
                        commit("AUTH_SUCCESS", token);
                        dispatch("LOAD_USER_DATA");
                        resolve(response);
                        return;
                    }
                    commit("AUTH_ERROR", response);
                    reject(response);
                })
                .catch(error => {
                    commit("AUTH_ERROR", error);
                    reject(error);
                })
        });
    },
    "LOAD_USER_DATA": ({commit, dispatch}) => {
        return new Promise(function(resolve, reject){
            axios({url: '/api/user/getBasicUserData', method: 'GET'})
                .then(response => {
                    if(response.status === 200) {
                        const userData = response.data;
                        commit("PUT_USER_DATA", {
                            email: userData['email'],
                            name: userData['name'],
                            surname: userData['surname'],
                            telegram: userData['telegram'],
                            avatar: '/' + userData['avatar'],
                            showSchedule: userData['showSchedule']
                        });
                        resolve(response);
                    }
                    reject(response);
                })
                .catch(error => {
                    localStorage.removeItem('user-data');
                    reject(error);
                });
        });
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}