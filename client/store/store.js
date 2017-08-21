import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);
const state = {
        favouriteBookList: [],
        readBookList:[],
        doneList:[],
        favouriteList:[]
};

const mutations = {
    setBook (state, data) {
        state.favouriteBookList = data;
    },

    setReadBook(state, data) {
        state.readBookList = data;
    },

    setDoneBook(state, data) {
        state.doneList = data;
    },

    setFavouriteBook(state, data) {
        state.favouriteList = data;
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
    removeFromRead (state, bookToRemove) {
        const index = state.readBookList
            .findIndex(book => bookToRemove.id === book.id);
        state.readBookList.splice(index, 1);
        axios.delete('http://localhost:3000/read/' + bookToRemove.id);
    },

    removeFromDone (state, bookToRemove) {
        const index = state.doneList
            .findIndex(book => bookToRemove.id === book.id);
        state.doneList.splice(index, 1);
        axios.delete('http://localhost:3000/done/' + bookToRemove.id);
    },

    removeFromFavourite (state, bookToRemove) {
        const index = state.favouriteList
            .findIndex(book => bookToRemove.id === book.id);
        state.favouriteList.splice(index, 1);
        axios.delete('http://localhost:3000/favourite/' + bookToRemove.id);
    }

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

    getDoneBooks ({commit}) {
        axios.get('http://localhost:3000/done')
            .then((res) => {
                commit('setDoneBook', res.data)
            });

    },

    getFavouriteBooks ({commit}) {
        axios.get('http://localhost:3000/favourite')
            .then((res) => {
                commit('setFavouriteBook', res.data)
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