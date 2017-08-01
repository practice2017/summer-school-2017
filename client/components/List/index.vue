<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
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
                    <div
                            class="city-card__content__status-icon"
                            v-bind:style="{ 'background-image': 'url(' + city.icon_url + ')' }"></div>
                    <div class="city-card__content__temperature">{{city.temperature}}°C</div>
                    <div class="city-card__content__title">{{city.name}}</div>
                </router-link>
                <button @click="$store.commit('removeFromFavourite', city)">Remove from fav</button>
            </div>
        </div>
    </div>
</template>

<script>
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
                this.$store.dispatch('addToFavourite', cityToAdd.name)
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
        }
    };
</script>