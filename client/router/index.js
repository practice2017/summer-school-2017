import Vue from 'vue';
import Router from 'vue-router';
import Home from './../views/Home';
import Search from './../views/Search';
import Details from './../views/Details';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/search',
            component: Search
        },
        {
            path: '/city/:cityName',
            component: Details
        }
    ]
});