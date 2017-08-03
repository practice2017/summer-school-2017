import { Selector } from 'testcafe';

export default class IndexPage {
    constructor () {
        const addCityBtn = Selector('#add_city');
        const weatherWrapper = Selector('.city-card');

        this.addCityBtn = addCityBtn;
        this.counter    = weatherWrapper.child('.city-card__image');
        this.increment  = weatherWrapper.child('.city-card__name');
        this.desrement  = weatherWrapper.child('.city-card__weather');
    }
}
