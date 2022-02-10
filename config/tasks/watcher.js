import {series, watch} from 'gulp';
import {cwd, paths} from '../store';
import {fonts} from '../utils/fonts';
import {svgSprites} from '../utils/svgSprites';
import {copy} from '../utils/copy';
import {html} from './html';
import {images} from './images';
import {scripts} from './scripts';
import {styles} from './styles';

/**
 * Отслеживание изменений в файлах
 * html передается вторым потоком тк не найдено решение по нормальному обновлению браузера после изменения в файлах
 * @see https://gulpjs.com/docs/en/api/watch
 */
function watcher() {
    watch(paths.watch.html, {cwd}, series(html));
    watch(paths.watch.images, {cwd}, series(images, html));
    watch(paths.watch.styles, {cwd}, series(styles));
    watch(paths.watch.scripts, {cwd}, series(scripts));
    watch(paths.watch.svgSprites, {cwd}, series(svgSprites, html));
    watch(paths.watch.fonts, {cwd}, series(fonts, html));
    watch(paths.watch.static, {cwd}, series(copy, html));
}

export {
    watcher,
};
