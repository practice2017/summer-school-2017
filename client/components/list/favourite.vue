<template>
    <div class="book-list">
        <div class="header">
            <router-link to='/'>
                Главная
            </router-link>
            <router-link to='/readlist'>
                Читаю
            </router-link>
            <router-link to='/done'>
                Прочитано
            </router-link>
            <router-link to='/favourite'>
                Избранное
            </router-link>
        </div>
        <div class="book-container" v-for="book in getFavouriteList">

            <div class="book-name">
                <h1>{{ book.name }}</h1>
            </div>
            <div class="author-name">
                <h2>{{ book.author}}</h2>
            </div>
            <router-link :to="'/book/' + book.id" class="read-more">
                Подробнее
            </router-link>
            <button class="favorites" @click="removeFromFav(book)"><img src="https://image.ibb.co/kHdqEv/2.png"></button>
        </div>
    </div>

</template>


<script>
    export default {
        computed:{
            getFavouriteList(){
                return this.$store.state.favouriteList;
            }
        },
        methods:{
            removeFromFav: function(book){
                this.$store.commit('removeFromFavourite', book);
            }
        },
        mounted(){
            this.$store.dispatch('getFavouriteBooks');
        }
    }
</script>