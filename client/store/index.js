import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import {apiKey} from '../../config.json'

Vue.use(Vuex);

const state = {
    currentCity: {
        temperature: '',
        name: '',
        description: '',
        imgUrl: ''
    },
    favouriteCityList: [ // Mock
    ]
};

const getters = {
    favouriteCityList: (state) => {
        return state.favouriteCityList.map((city, index) => {
            if (!city.temperature) {
                store.dispatch('getWeatherForCityList', {index, city: city.name});
            }
            return city;
        });
    }
};

const mutations = {
    setWeather (state, data) {
        const {temp_c, condition} = data.current;

        state.currentCity = {
            temperature: temp_c,
            description: condition.text,
            imgUrl: condition.icon,
            name: state.currentCity.name
        };
    },
    setCity (state, cityName) {
        state.currentCity.name = cityName;
    },
    setNotFound (state) {
        state.currentCity = null;
    },
    addToFavourite (state, {cityName, weather}) {
        const newCity = {
            name: cityName,
            temperature: weather.current.temp_c,
            conditionText: weather.current.condition.text,
            icon_url: weather.current.condition.icon
        };
        state.favouriteCityList.push(newCity);
    },
    removeFromFavourite (state, cityToRemove) {
        const index = state.favouriteCityList
            .findIndex(city => cityToRemove.id === city.id);
        state.favouriteCityList.splice(index, 1);
        axios.delete('http://localhost:3000/cities/' + cityToRemove.id);
    },
    setWeatherForCityInList (state, {index, weather}) {
        state.favouriteCityList[index].conditionText = weather.current.condition.text;
        state.favouriteCityList[index].temperature = weather.current.temp_c;
        state.favouriteCityList[index].icon_url = weather.current.condition.icon;
    },
    setCities (state, list) {
        state.favouriteCityList = list
    }
};

const actions = {
    getWeather ({commit}) {
        axios.get(`http://api.apixu.com/v1/current.json?key=${apiKey}&q=${state.currentCity.name}`)
            .then((res) => {
                commit('setWeather', res.data);
            })
            .catch(() => commit('setNotFound'));
    },

    searchCity ({state}, value) {
        return new Promise((resolve, reject) => {
            axios.get(`http://api.apixu.com/v1/search.json?key=${apiKey}&q=${value}`)
                .then(res => resolve(res.data))
                .catch(() => reject());
        });
    },

    getFavList ({commit}) {
        axios.get(`http://localhost:3000/cities`)
            .then((res) => {
                commit('setCities', res.data);
            })
            .catch(() => commit('setNotFound'));
    },

    getWeatherForCityList ({commit}, {index, city}) {
        axios.get(`http://api.apixu.com/v1/current.json?key=${apiKey}&q=${city}`)
            .then((res) => {
                commit('setWeatherForCityInList', {index, weather: res.data});
            });
    },

    addToFavourite ({commit}, city) {
        axios.get(`http://api.apixu.com/v1/current.json?key=${apiKey}&q=${city}`)
            .then((res) => {
                commit('addToFavourite', {cityName: city, weather: res.data});
            });
    }
};

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});

export default store
