import CityCard from './CityCard';
import axios from 'axios';
import { apiKey } from './../config.json';

const cityName = 'Perm';

document.getElementById('add_city').onclick = () => {
    axios.get(`http://api.apixu.com/v1/current.json?key=${apiKey}&q=${cityName}`)
        .then(res => {
            const city = new CityCard(res.data);
            city.render();
        })
        .catch(e => console.log('error'));
};

