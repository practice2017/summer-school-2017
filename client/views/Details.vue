<template>
    <div class="page">
        <CityCard></CityCard>
        <router-link to="/">Return to cities list</router-link>
    </div>
</template>

<script>
    import CityCard from 'components/CityCard'

    export default {
        components: {
            CityCard
        }
    }
</script>