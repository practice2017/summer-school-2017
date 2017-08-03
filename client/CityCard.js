import style from 'style.css';

class CityCard {
    constructor(data) {
        this.icon = data.current.condition.icon;
        this.text = data.current.condition.text;
        this.country = data.location.country;
        this.name = data.location.name;
    }

    render() {
        let murkup = `
            <div class=${style.add_city}>
                <img styl src=${this.icon}>
                <span>${this.text}</span>
                <span>${this.country}</span>
                <span class="city-card__name">${this.name}</span>
            </div>`;

        document.getElementById('weather-container').innerHTML += murkup;
    }
}

export default CityCard;
