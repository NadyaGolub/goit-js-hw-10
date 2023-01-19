import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';


const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const 