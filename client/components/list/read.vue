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
        <div class="book-container" v-for="book in getReadBookList">

            <div class="book-name">
                <h1>{{ book.name }}</h1>
            </div>
            <div class="author-name">
                <h2>{{ book.author}}</h2>
            </div>
            <router-link :to="'/book/' + book.id" class="read-more">
                Подробнее
            </router-link>
            <button class="done" @click="removeFromFav(book)"></button>
        </div>
    </div>

</template>


<script>
    export default {
        computed:{
            getReadBookList(){
                return this.$store.state.readBookList;
            }
        },
        methods:{
            removeFromFav: function(book){
                this.$store.commit('removeFromRead', book);
            }
        },
        mounted(){
            this.$store.dispatch('getReadBooks');
        }
    }
</script>