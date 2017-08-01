<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div class="container details-page">
        <h1 class="page__title">{{ getCity.name }}</h1>
        <div class="details-page__status-icon">
            <img :src=getCity.imgUrl>
        </div>

        <div class="details-page__temperature">
            {{ getCity.temperature }}°C
        </div>

        <div class="details-page__table">
            <div class="details-page__table__column" v-for="weather in getForecast">
                <div class="day-cell">
                    <div class="day-cell__title">{{ weather.date }}</div>
                    <div class="day-cell__status-icon"
                         v-bind:style="{ 'background-image': 'url(' + weather.day.condition.icon + ')' }"></div>
                    <div class="day-cell__temperature">
                        <div class="day-cell__temperature__day">{{ weather.day.maxtemp_c }} Max temperature</div>
                        <div class="day-cell__temperature__night">{{ weather.day.mintemp_c }} Min temperature</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            getCity() {
                return this.$store.state.currentCity;
            },

            getForecast() {
                console.log(this.$store.state.currentCity.forecast);
                return this.$store.state.currentCity.forecast;
            }
        },
        mounted() {
            this.$store.commit('setCity', this.$route.params.cityName);
            this.$store.dispatch('getWeather');
            this.$store.dispatch('loadForecast');
        }
    }
</script>
