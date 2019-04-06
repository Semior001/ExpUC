import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import NotFound from "./components/NotFound";

export const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/login',
        component: LoginPage
    },
    {
        path: '*',
        name: 'not-found',
        component: NotFound
    }
];