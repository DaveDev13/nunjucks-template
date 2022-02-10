// import '../styles/main.scss';
import $ from 'jquery';
window.$ = $;
window.jQuery = $;

import './utils/helpers';
import './modules/social';
import {vhFix} from './vendor/vh-fix';
import {actualYear} from './modules/actualYear';
// import objectFitImages from 'object-fit-images';
// import objectFitVideos from 'object-fit-videos';
import lazyLoading from './modules/lazyLoading';
import header from '@components/header/header';

vhFix();
actualYear();
// objectFitImages();
// objectFitVideos();
lazyLoading.init();
header.init();
