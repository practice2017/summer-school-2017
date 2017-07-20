import Vue from 'vue';
import Vuex from 'vuex';
import { apiKey } from '../../config.json'

Vue.use(Vuex);

const state = {
    count: 0,
    city: 'Perm'
}

const mutations = {
    INCREMENT (state) {
        state.count++
    },
    DECREMENT (state) {
        state.count--
    }
}

const actions = {
    incrementAsync ({ commit }) {
        setTimeout(() => {
            commit('INCREMENT')
        }, 200)
    },

    getWeather ({ commit }) {
        fetch(`api.openweathermap.org/data/2.5/forecast?id=511196&APPID=${apiKey}`).then(
            (res) => console.log('res', res)
        )
    }
};

const store = new Vuex.Store({
    state,
    mutations,
    actions
});

export default store
