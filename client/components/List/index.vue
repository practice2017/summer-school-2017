<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="container">
        <h1 class="page__title">Weather</h1>

        <input type="search"
               placeholder="Search city"
               v-on:input="searchCity($event.target.value)">
        <div class="founded" v-for="city in foundedCityList">
            <button @click="addToFav(city)">Add to fav</button>
            <router-link v-bind:to="'/city/' + city.name">{{ city.name }}</router-link>
        </div>

        <div class="cities-list">
            <div class="city-card" v-for="city in getFavouriteCityList" :href="'/city/' + city.name">
                <router-link v-bind:to="'/city/' + city.name" class="city-card__content">
                    <div class="city-card__content__status-icon"></div>
                    <div class="city-card__content__temperature">{need temp}</div>
                    <div class="city-card__content__title">{{city.name}}</div>

                    <button @click="$store.commit('removeFromFavourite', city)">Remove from fav</button>
                </router-link>
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
                const index = this.foundedCityList
                    .findIndex(city => cityToAdd.id === city.id);
                this.foundedCityList.splice(index, 1);
                this.$store.commit('addToFavourite', cityToAdd);
                axios.post('http://localhost:3000/cities', cityToAdd);
            }
        },
        computed: {
            getFavouriteCityList() {
                return this.$store.state.favouriteCityList;
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