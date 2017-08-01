<template>
    <div class="container details-page">
        <h1 class="page__title">{{ getCity.name }}</h1>

        <div class="details-page__status-icon">
            <!--<img :src=getCity.imgUrl>-->
        </div>

        <div class="details-page__temperature">
            {{ getCity.temperature }}°C
        </div>

        <div class="details-page__table">
            <div class="details-page__table__column">
                <div class="day-cell">
                    <div class="day-cell__title">Сегодня</div>
                    <div class="day-cell__status-icon"></div>
                    <div class="day-cell__temperature">
                        <div class="day-cell__temperature__day">+25 днем</div>
                        <div class="day-cell__temperature__night">+11 ночью</div>
                    </div>
                </div>
            </div>
            <div class="details-page__table__column">
                <div class="day-cell">
                    <div class="day-cell__title">Сегодня</div>
                    <div class="day-cell__status-icon"></div>
                    <div class="day-cell__temperature">
                        <div class="day-cell__temperature__day">+25 днем</div>
                        <div class="day-cell__temperature__night">+11 ночью</div>
                    </div>
                </div>
            </div>
            <div class="details-page__table__column">
                <div class="day-cell">
                    <div class="day-cell__title">Сегодня</div>
                    <div class="day-cell__status-icon"></div>
                    <div class="day-cell__temperature">
                        <div class="day-cell__temperature__day">+25 днем</div>
                        <div class="day-cell__temperature__night">+11 ночью</div>
                    </div>
                </div>
            </div>
            <div class="details-page__table__column">
                <div class="day-cell">
                    <div class="day-cell__title">Сегодня</div>
                    <div class="day-cell__status-icon"></div>
                    <div class="day-cell__temperature">
                        <div class="day-cell__temperature__day">+25 днем</div>
                        <div class="day-cell__temperature__night">+11 ночью</div>
                    </div>
                </div>
            </div>
            <div class="details-page__table__column">
                <div class="day-cell">
                    <div class="day-cell__title">Сегодня</div>
                    <div class="day-cell__status-icon"></div>
                    <div class="day-cell__temperature">
                        <div class="day-cell__temperature__day">+25 днем</div>
                        <div class="day-cell__temperature__night">+11 ночью</div>
                    </div>
                </div>
            </div>
        </div>

        <!--<button @click="$store.dispatch('getWeather')">Get weather</button>-->
    </div>
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
