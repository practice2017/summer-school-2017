import Vue from 'vue';
import Router from 'vue-router';
import List from './../components/list/list.vue';
import Details from './../components/list/details.vue';
import Read from './../components/list/read.vue';
import Favourite from './../components/list/favourite.vue';
import Done from './../components/list/done.vue';

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
         },
        {
            name: 'readlist',
            path: '/readlist',
            component: Read
        },
        {
            name: 'favourite',
            path: '/favourite',
            component: Favourite
        },
        {
            name: 'done',
            path: '/done',
            component: Done
        }
    ]
});
