export default {
    render(h) {
        return (
            <div id="app">
                <div class="content">
                    <div class="header">
                        <a href="#">Главная</a>
                        <a href="#">Читаю</a>
                        <a href="#">Прочитано</a>
                        <a href="#">Избранное</a>
                    </div>
                    <list></list>
                    <router-view></router-view>
                </div>
            </div>
        );
    }
};
