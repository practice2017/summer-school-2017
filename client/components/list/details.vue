<template>
    <div class="book-list">
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
            <a href="#" class="read-more">Прочитать</a>
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
       mounted(){
           this.$store.dispatch('getBook',this.$route.params.book_name);
       }
    }
</script>