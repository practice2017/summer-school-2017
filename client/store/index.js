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
        imgUrl: '',
        forecast: []
    },
    favouriteCityList: [ // Mock
        {
            name: 'Perm',
            id: 1,
            temperature: 0,
            icon_url: null
        },
        {
            name: 'Paris',
            id: 2,
            temperature: 0,
            icon_url: null
        }
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
            ... state.currentCity,
            temperature: temp_c,
            description: condition.text,
            imgUrl: condition.icon,
        };
    },
    setCity (state, cityName) {
        state.currentCity.name = cityName;
    },
    setNotFound (state) {
        state.currentCity = {
            temperature: '',
            name: null,
            description: '',
            imgUrl: ''
        };
    },
    addToFavourite (state, {cityName, weather}) {
        const newCity = {
            name: cityName,
            temperature: weather.current.temp_c,
            icon_url: weather.current.condition.icon
        };
        state.favouriteCityList.push(newCity);
    },
    removeFromFavourite (state, cityToRemove) {
        const index = state.favouriteCityList
            .findIndex(city => cityToRemove.id === city.id);
        state.favouriteCityList.splice(index, 1);
    },
    setWeatherForCityInList (state, {index, weather}) {
        state.favouriteCityList[index].temperature = weather.current.temp_c;
        state.favouriteCityList[index].icon_url = weather.current.condition.icon;
    },

    forecastLoaded (state, forecast) {
        state.currentCity.forecast = forecast;
    }
};

const actions = {
    getWeather ({commit}) {
        api.current(state.currentCity.name, (res) => {
            commit('setWeather', res.data);
        }, () => commit('setNotFound'));
    },

    searchCity ({state}, value) {
        return new Promise((resolve, reject) => {
            api.search(value, resolve, reject);
        });
    },

    getWeatherForCityList ({commit}, {index, city}) {
        api.current(city, (res) => {
            commit('setWeatherForCityInList', {index, weather: res.data});
        }, null);
    },

    addToFavourite ({commit}, city) {
        api.current(city, (res) => {
            commit('addToFavourite', {cityName: city, weather: res.data});
        }, null);
    },

    loadForecast ({commit}) {
        api.forecast(state.currentCity.name, (res) => {
            commit('forecastLoaded', res.data.forecast.forecastday);
        }, null);
    }

};

const api = {
    current: (cityName, resolve, reject) => {
        axios
            .get(`http://api.apixu.com/v1/current.json?key=${apiKey}&q=${cityName}`)
            .then(resolve)
            .catch(reject);
    },
    search: (searchString, resolve, reject) => {
        axios
            .get(`http://api.apixu.com/v1/search.json?key=${apiKey}&q=${searchString}`)
            .then(res => resolve(res.data))
            .catch(() => reject());
    },
    forecast: (cityName, resolve, reject) => {
        axios
            .get(`http://api.apixu.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=5`)
            .then(resolve)
            .catch(reject)
    }
};

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});

export default store
