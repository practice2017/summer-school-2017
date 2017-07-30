<template>
    <div v-if="getCity">
        <div><img :src=getCity.imgUrl>{{ getCity.name }}, {{ getCity.temperature }}°C</div>
        <div>{{ getCity.description }}</div>
        <button @click="$store.dispatch('getWeather')">Get weather</button>
    </div>
    <div v-else="getCity">City named '{{ $route.params.cityName }}' not found</div>
</template>

<script>
    export default {
        computed: {
            getCity() {
                return this.$store.state.currentCity;
            }
        },
        mounted() {
            this.$store.commit('setCity', this.$route.params.cityName);
            this.$store.dispatch('getWeather');
        }
    }
</script>

<style>
    .menu-links a {
        display: inline-block;
        text-decoration: none;
        color: #555;
        margin-right: 30px;
    }
</style>
