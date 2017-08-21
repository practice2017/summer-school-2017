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
        <div class="book-container">
            <div class="book-name">
                <h1>{{ getBook.name }}</h1>
            </div>
            <div class="author-name">
                <h2>{{ getBook.author}}</h2>
            </div>
            <div class="detail">
                <p>{{ getBook.more_information }}</p>
            </div>
            <button class="read-more" @click="addToRead(getBook.name, getBook.author, getBook.more_information)">Прочитать</button>
        </div>
    </div>

</template>


<script>
   export default {
        computed: {
            getBook() {
                console.log(this.$route.params.book_name);
                console.log(this.$store.state.favouriteBookList);
                return this.$store.state.favouriteBookList;
            },

        },
       methods:{
           addToRead: function(bookName,bookAuthor,bookMoreInformation){
               console.log(bookName,bookAuthor,bookMoreInformation);
               this.$store.commit('addToRead', {bookName,bookAuthor,bookMoreInformation});
           }
       },
       mounted(){
           this.$store.dispatch('getBook',this.$route.params.book_name);
       }
    }
</script>