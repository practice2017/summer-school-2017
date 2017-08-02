<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div class="container">
        <h1 class="page__title">Weather</h1>

        <div class="search-panel">
            <input class="search-panel__input"
                   type="search"
                   placeholder="Search city"
                   v-on:input="searchCity($event.target.value)">
            <div class="search-panel__list">
                <div class="search-panel__list__item" v-for="city in foundedCityList" @click="addToFav(city)">
                    {{ city.name }}
                </div>
            </div>
        </div>

        <div class="cities-list" v-if="foundedCityList.length === 0">
            <div class="city-card" v-for="city in getFavouriteCityList" :href="'/city/' + city.name">
                <router-link v-bind:to="'/city/' + city.name" class="city-card__content">
                    <div class="city-card__content__status-icon"
                         v-bind:style="{ 'background-image': 'url(' + city.icon_url + ')' }"></div>
                    <div class="city-card__content__condition">{{city.conditionText}}</div>
                    <div class="city-card__content__temperature">{{city.temperature}}°C</div>
                    <div class="city-card__content__title">{{city.name}}</div>
                </router-link>
                <button class="city-card__remove" @click="$store.commit('removeFromFavourite', city)">Remove from fav</button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        methods: {
            searchCity: function (value) {
                this.$store.dispatch('searchCity', value)
                    .then((res) => {
                        this.foundedCityList = res.filter((foundCity) => {
                            // If city already in favourite list - delete it
                            const index = this.$store.state.favouriteCityList
                                .findIndex((favCity) => foundCity.id === favCity.id);
                            return index === -1;
                        });
                    })
                    .catch(() => this.foundedCityList = []);
            },
            addToFav: function (cityToAdd) {
                this.foundedCityList = [];
                this.$store.dispatch('addToFavourite', cityToAdd.name);
            }
        },
        computed: {
            getFavouriteCityList() {
                return this.$store.getters.favouriteCityList;
            }
        },
        data: function () {
            return {
                foundedCityList: []
            }
        },
        mounted() {
            this.$store.dispatch('getFavList');
        }
    };
</script>