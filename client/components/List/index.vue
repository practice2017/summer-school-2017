<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="counter-wrapper">
        <input
            type="search"
            placeholder="Search city"
            v-on:input="searchCity($event.target.value)"
        >
        <div
            class="founded"
            v-for="city in foundedCityList">
            <button @click="addToFav(city)">Add to fav</button>
            <router-link v-bind:to="'/city/' + city.name">{{ city.name }}</router-link>
        </div>
        <h2>Favourite List</h2>
        <div
            class="city"
            v-for="city in getFavouriteCityList"
            :href="'/city/' + city.name">
            <button @click="$store.commit('removeFromFavourite', city)">Remove from fav</button>
            <router-link v-bind:to="'/city/' + city.name">{{ city.name }}</router-link>
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
                    .catch(() => this.foundedCityList = [] );
            },
            addToFav: function (cityToAdd) {
                const index = this.foundedCityList
                    .findIndex(city => cityToAdd.id === city.id);
                this.foundedCityList.splice(index, 1);
                this.$store.commit('addToFavourite', cityToAdd)
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
        }
    };
</script>

<style>
    .city, .founded {
        display: block;
    }
</style>
