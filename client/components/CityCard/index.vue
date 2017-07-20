<template>
    <div>
        hello
        {{ getCity }}
        <button @click="$store.dispatch('getWeather')">Get weather</button>
    </div>
</template>

<script>
    export default {
        computed: {
            getCity() {
                return this.$store.state.city
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
