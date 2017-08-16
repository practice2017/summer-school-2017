import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);
const state = {
        favouriteBookList: []
};

/*const getters = {
    favouriteBookList: (state) => {
        return state.favouriteBookList.map(el => el.id);
    },
};*/


const mutations = {
    setBook (state, data) {
        state.favouriteBookList = data;
    },

    removeBook (state, book) {
        state.favouriteBookList.splice(state.favouriteBookList.indexOf(book),1)
    }

};



const actions = {
    getBooks ({commit}) {
        axios.get('http://localhost:3000/books')
            .then((res) => {
                commit('setBook', res.data)
            });

    },
    getBook ({commit},book_id) {
        axios.get('http://localhost:3000/books/'+book_id)
            .then((res) => {
                commit('setBook', res.data)
            });

    }
};
const store = new Vuex.Store({
    state,
    mutations,
    actions
});
export default store