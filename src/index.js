import './sass/main.scss';
import fetchCountries from './fetchCountries';
import { debounce } from 'lodash';
import countriesListMarkup from './templates/countries-list.hbs';
import countriesCardMarkup from './templates/countries-card.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/Material.css';
import 'material-design-icons/iconfont/material-icons.css';
import {error} from '@pnotify/core';

const options = {
    alert: {
        title: 'Упс',
        text: 'Знайдено занадто багато збігів. Введіть більш конкретний запит!',
        type: alert,
        delay: 1000,
        closer: false,
        sticker: false,
        height: '5px',
    },
    error: {
        title: 'Cталася помилка',
        text: 'Країни із такою назвою не інснує. Уточніть параметр пошуку!',
        type: error,
        delay: 1000,
        closer: false,
        sticker: false,
        height: '5px',
    },
        };
const refs = {
    inputField: document.querySelector('#name-input'),
    container: document.querySelector('.countries__wrapper'),
}

refs.inputField.addEventListener('input', debounce(onSearch,500));

function onSearch(e) {
    const nameCountrie = e.target.value;
    if (nameCountrie === '') {
        refs.container.innerHTML = ""
        return
    };

    fetchCountries(nameCountrie)
        .then(response => {
            return response.json()
        })
        .then(renderCountriesMarkup)
}
function renderCountriesMarkup(object) {
    if (object.length > 10) {
        error(options.alert);
        return;
    }
    if (object.length > 1 && object.length <= 10) {
        addCountriesListMarkup(object);
        return;
    }
    
    if (object.status === 404) {
        error(options.error);
        return 
    }
    object.map(value => {
        addCountriesCardMarkup(value);
    })
}
function addCountriesListMarkup(data) {
            refs.container.innerHTML = countriesListMarkup(data);
        };
function addCountriesCardMarkup(data) {
    refs.container.innerHTML = ""
    refs.container.innerHTML = countriesCardMarkup(data);
};
    