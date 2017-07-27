import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { apiKey } from '../../config.json'

Vue.use(Vuex);

const state = {
    temperature: 21,
    city: 'Perm',
    description: 'Пасмурно'
}

const mutations = {
    INCREMENT (state) {
        state.count++
    },
    DECREMENT (state) {
        state.count--
    },
    SETTER (state, data) {
        state.temperature = data.current.temp_c
    }
}

const actions = {
    incrementAsync ({ commit }) {
        setTimeout(() => {
            commit('INCREMENT')
        }, 200)
    },

    getWeather ({ commit }) {
        axios.get(`http://api.apixu.com/v1/current.json?key=${apiKey}&q=${state.city}`).then(
            (res) => {
                commit('SETTER', res.data);
            }
        )
    }
};

const store = new Vuex.Store({
    state,
    mutations,
    actions
});

export default store
