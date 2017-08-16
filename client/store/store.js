import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);
const state = {
        favouriteBookList: [],
        readBookList:[]
};

const mutations = {
    setBook (state, data) {
        state.favouriteBookList = data;
    },

    setReadBook(state, data) {
        state.readBookList = data;
    },

    removeBook (state, book) {
        state.favouriteBookList.splice(state.favouriteBookList.indexOf(book),1)
    },
    addToRead (state, {bookName,bookAuthor,bookMoreInformation}) {
        const newBook = {
            name: bookName,
            author: bookAuthor,
            more_information: bookMoreInformation
        };
        state.readBookList.push(newBook);

        axios.post('http://localhost:3000/read', newBook);
    },

};



const actions = {
    getBooks ({commit}) {
        axios.get('http://localhost:3000/books')
            .then((res) => {
                commit('setBook', res.data)
            });

    },

    getReadBooks ({commit}) {
        axios.get('http://localhost:3000/read')
            .then((res) => {
                commit('setReadBook', res.data)
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