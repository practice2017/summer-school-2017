import Vue from 'vue';
import Router from 'vue-router';
import List from './../components/list/list.vue';
import Details from './../components/list/details.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: List
        },
         {
             name: 'book',
             path: '/book/:book_name',
             component: Details
         }
    ]
});
