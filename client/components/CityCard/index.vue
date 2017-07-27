<template>
    <div>
        {{ getCity }}, {{ getTemp }}°C
        <button @click="$store.dispatch('getWeather')">Get weather</button>
    </div>
</template>

<script>
    export default {
        computed: {
            getCity() {
                return this.$store.state.city
            },
            getTemp() {
                return this.$store.state.temperature
            }
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
