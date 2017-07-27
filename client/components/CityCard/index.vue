<template>
    <div v-if="getCity">
        <div><img :src=getImg>{{ getCity }}, {{ getTemp }}°C</div>
        <div>{{ getDescription }}</div>
        <button @click="$store.dispatch('getWeather')">Get weather</button>
    </div>
    <div v-else="getCity">City with name '{{ $route.params.cityName }}' not found</div>
</template>

<script>
    export default {
        computed: {
            getCity() {
                return this.$store.state.city;
            },
            getTemp() {
                return this.$store.state.temperature;
            },
            getImg() {
                return this.$store.state.imgUrl;
            },
            getDescription() {
                return this.$store.state.description;
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
