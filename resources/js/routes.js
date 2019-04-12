import Home from './components/Home';
import LoginPage from './components/LoginPage';
import NotFound from './components/NotFound';
import RegisterPage from './components/RegisterPage';
import Schedule from './components/Schedule';
import store from './store/index'
import Profile from './components/Profile';
import AddNewSubject from './components/AddNewSubject';

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters['user/isAuthenticated']) {
        next();
        return
    }
    next('/')
};

const ifAuthenticated = (to, from, next) => {
    if (store.getters['user/isAuthenticated']) {
        next();
        return
    }
    next('/login')
};

const desktopOnly = (to, from, next) => {
    return !this.$vuetify.breakpoint.sm && !this.$vuetify.breakpoint.xs;
}

export const routes = [
    {
        name: 'home',
        title: 'Home',
        icon: 'dashboard',
        path: '/',
        component: Home,
        beforeEnter: ifAuthenticated
    },
    {
        name: 'schedule',
        title: 'Schedule',
        icon: 'calendar_today',
        path: '/schedule',
        component: Schedule,
        beforeEnter: ifAuthenticated
    },
    {
        name: 'add-new-subject',
        title: 'Add new subject',
        icon: 'add_circle',
        path: '/schedule/subjects/add',
        component: AddNewSubject,
        beforeEnter: ifAuthenticated,
        showInToolbar: desktopOnly
    },
    {
        name: 'login',
        title: 'Login',
        icon: '',
        path: '/login',
        component: LoginPage,
        beforeEnter: ifNotAuthenticated,
        showInToolbar: false,
        doNotShowNavigation: true
    },
    {
        name: 'register',
        title: 'Register',
        icon: '',
        path: '/register',
        component: RegisterPage,
        beforeEnter: ifNotAuthenticated,
        showInToolbar: false,
        doNotShowNavigation: true
    },
    {
        name: 'profile',
        title: 'Profile',
        icon: 'account_box',
        path: '/profile',
        component: Profile,
        beforeEnter: ifAuthenticated,
        showInToolbar: false
    },
    {
        name: 'not-found',
        title: '404 - Not found',
        icon: '',
        path: '*',
        component: NotFound,
        showInToolbar: false,
        doNotShowNavigation: true
    }

    // todo сделать reset-password-page
];